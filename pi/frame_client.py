#!/usr/bin/env python3
import os, time, requests, threading, json, random
from PIL import Image, ImageOps
from google.oauth2 import service_account
from google.auth.transport.requests import Request

# CONFIG
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
IMAGE_DIR = os.path.join(BASE_DIR, "images")
CRED_PATH = os.path.join(BASE_DIR, "service-account.json")
APP_ID = "frame-ink"
PROJECT_ID = "frame-ink"
# REST Endpoints
QUERY_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/artifacts/{APP_ID}/public/data:runQuery"
CONFIG_URL = f"https://firestore.googleapis.com/v1/projects/{PROJECT_ID}/databases/(default)/documents/artifacts/{APP_ID}/public/data/config/global"

# HARDWARE
try:
    from inky.auto import auto
    inky = auto(); HAS_INKY = True; print(f"✅ Inky: {inky.resolution}")
except:
    HAS_INKY = False; print("⚠️ Simulation Mode")

# STATE
current_image_name = None
last_rotation_time = time.time()
config_interval_minutes = 0 # 0 = Never

def get_token():
    try:
        if os.path.exists(CRED_PATH):
            creds = service_account.Credentials.from_service_account_file(CRED_PATH, scopes=["https://www.googleapis.com/auth/datastore"])
            creds.refresh(Request())
            return creds.token
    except Exception as e: print(f"Auth Err: {e}")
    return None

def confirm_display(image_name):
    print(f"📡 Confirming {image_name}...")
    try:
        token = get_token()
        if token:
            url = f"{CONFIG_URL}?updateMask.fieldPaths=confirmed_image"
            body = {"fields": {"confirmed_image": {"stringValue": image_name}}}
            requests.patch(url, headers={"Authorization": f"Bearer {token}"}, json=body)
            print("✅ Confirmation sent!")
    except Exception as e: print(f"Confirm Err: {e}")

def get_random_image_name(exclude=None):
    """Fetch all image names and pick a random one."""
    print("🎲 Picking random image...")
    try:
        # Query only for 'name' field to be lightweight
        q_body = {
            "structuredQuery": {
                "from": [{"collectionId": "images"}],
                "select": {"fields": [{"fieldPath": "name"}]}
            }
        }
        res = requests.post(QUERY_URL, json=q_body)
        if res.status_code == 200:
            docs = res.json()
            names = []
            for d in docs:
                if 'document' in d:
                    name = d['document']['fields']['name']['stringValue']
                    names.append(name)
            
            if not names: return None
            
            # Simple filtering
            if exclude and len(names) > 1:
                names = [n for n in names if n != exclude]
                
            choice = random.choice(names)
            print(f"👉 Picked: {choice}")
            return choice
    except Exception as e: print(f"Random Err: {e}")
    return None

def trigger_rotation():
    """Pick a new image and update Firestore to trigger the cycle."""
    global last_rotation_time
    new_img = get_random_image_name(exclude=current_image_name)
    if new_img:
        print(f"🔄 ROTATING to: {new_img}")
        try:
            token = get_token()
            if token:
                # Update current_image in Firestore
                # This will eventually be picked up by the poll_loop
                url = f"{CONFIG_URL}?updateMask.fieldPaths=current_image"
                body = {"fields": {"current_image": {"stringValue": new_img}}}
                requests.patch(url, headers={"Authorization": f"Bearer {token}"}, json=body)
                last_rotation_time = time.time() # Reset timer
        except Exception as e: print(f"Rotate Err: {e}")

def update_display(path, image_name):
    global last_rotation_time
    try:
        img = Image.open(path)
        img = ImageOps.exif_transpose(img)
        if HAS_INKY:
            img = img.rotate(90, expand=True).resize(inky.resolution, Image.LANCZOS)
            inky.set_image(img); inky.show()
            print("✨ Display Updated!")
            confirm_display(image_name)
            last_rotation_time = time.time() # Mark success time
        else: 
            print(f"📺 Sim: {path}")
            confirm_display(image_name)
            last_rotation_time = time.time()
    except Exception as e: print(f"Display Err: {e}")

def poll_loop():
    global current_image_name, config_interval_minutes, last_rotation_time
    print("📡 Polling started...")
    
    while True:
        try:
            # 1. READ CONFIG & CHECK SCHEDULE
            res = requests.get(CONFIG_URL)
            if res.status_code == 200:
                data = res.json().get('fields', {})
                
                # Update Config
                new_interval = int(data.get('interval', {}).get('integerValue', 0))
                if new_interval != config_interval_minutes:
                    print(f"⏱️ Interval changed: {new_interval} min")
                    config_interval_minutes = new_interval

                # CHECK FOR ROTATION (Active Scheduler)
                if config_interval_minutes > 0:
                    delta = (time.time() - last_rotation_time) / 60
                    if delta >= config_interval_minutes:
                        print(f"⏰ Time to rotate! ({int(delta)} min elapsed)")
                        trigger_rotation() 
                        # We don't download here; we let the next loop iteration pick up the change
                
                # CHECK FOR NEW IMAGE (Passive Listener)
                new_img = data.get('current_image', {}).get('stringValue')
                if new_img and new_img != current_image_name:
                    print(f"🔔 See: {new_img}")
                    
                    # DIRECT QUERY
                    q_body = {"structuredQuery": {"from": [{"collectionId": "images"}], "where": {"fieldFilter": {"field": {"fieldPath": "name"}, "op": "EQUAL", "value": {"stringValue": new_img}}}, "limit": 1}}
                    ires = requests.post(QUERY_URL, json=q_body)
                    
                    download_success = False
                    if ires.status_code == 200:
                        results = ires.json()
                        if results and len(results) > 0 and 'document' in results[0]:
                            url = results[0]['document']['fields']['url']['stringValue']
                            print(f"⬇️ Downloading...")
                            dres = requests.get(url)
                            if dres.status_code == 200:
                                path = os.path.join(IMAGE_DIR, new_img)
                                with open(path, 'wb') as f: f.write(dres.content)
                                current_image_name = new_img # Update State
                                update_display(path, new_img)
                                download_success = True
                            else: print(f"⚠️ Download Fail: {dres.status_code}")
                        else: print(f"⚠️ Image not found in Registry.")
                    
                    # SELF-HEALING (Fallback)
                    if not download_success:
                        print("🚑 Image Failed/Deleted. Triggering SELF-HEALING Rotation...")
                        trigger_rotation()


        except Exception as e: print(f"Poll Err: {e}")
        time.sleep(5)

def heartbeat():
    while True:
        token = get_token()
        if token:
            requests.patch(f"{CONFIG_URL}?updateMask.fieldPaths=last_seen&updateMask.fieldPaths=status", 
                headers={"Authorization": f"Bearer {token}"},
                json={"fields": {"last_seen": {"timestampValue": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())}, "status": {"stringValue": "Online"}}})
        time.sleep(30)

if __name__ == "__main__":
    if not os.path.exists(IMAGE_DIR): os.makedirs(IMAGE_DIR)
    threading.Thread(target=heartbeat, daemon=True).start()
    poll_loop()
