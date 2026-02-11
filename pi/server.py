from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import shutil
import os
import time

import json

# Internal Modules
from utils import update_display

app = FastAPI(title="FrameLab API")

# --- CONFIG ---
BASE_DIR = Path(__file__).parent.absolute()
IMAGE_DIR = BASE_DIR / "images"
CONFIG_FILE = BASE_DIR / "local_config.json"

# Default Config
DEFAULT_CONFIG = {
    "current_image": "",
    "rotation": 90,
    "interval": 60,
    "last_updated": 0
}

# Ensure directories exist
IMAGE_DIR.mkdir(parents=True, exist_ok=True)

def load_config():
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, "r") as f:
                return {**DEFAULT_CONFIG, **json.load(f)}
        except:
            return DEFAULT_CONFIG
    return DEFAULT_CONFIG

def save_config(config):
    with open(CONFIG_FILE, "w") as f:
        json.dump(config, f, indent=4)

# CORS (Allow local React app to connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In a local LAN, this is acceptable
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROUTES ---

@app.get("/api/status")
def get_status():
    """Returns system health and current config."""
    config = load_config()
    return {
        "status": "online",
        "time": time.ctime(),
        "storage_usage": shutil.disk_usage(BASE_DIR).used // (1024*1024),
        "image_count": len(list(IMAGE_DIR.glob("*"))),
        "config": config
    }

@app.get("/api/config")
def get_config():
    """Fetch the current device configuration."""
    return load_config()

@app.post("/api/config")
async def update_config(config: dict):
    """Update device configuration."""
    current = load_config()
    new_config = {**current, **config, "last_updated": time.time()}
    save_config(new_config)
    return new_config

@app.get("/api/images")
def list_images():
    """List all available images."""
    images = []
    for file in IMAGE_DIR.iterdir():
        if file.suffix.lower() in [".jpg", ".jpeg", ".png"]:
            images.append({
                "id": file.name,
                "name": file.name,
                "url": f"/images/{file.name}",
                "size": file.stat().st_size,
                "created": file.stat().st_mtime
            })
    # Sort by newest
    images.sort(key=lambda x: x["created"], reverse=True)
    return images

@app.post("/api/upload")
async def upload_image(file: UploadFile):
    """Upload a new image to the frame."""
    try:
        file_path = IMAGE_DIR / file.filename
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        return {"filename": file.filename, "status": "uploaded"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/display/{filename}")
def display_image(filename: str):
    """Trigger the E-Ink display update."""
    file_path = IMAGE_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")
    
    try:
        # Update config to reflect new image
        config = load_config()
        config["current_image"] = filename
        save_config(config)
        
        update_display(file_path)
        return {"status": "success", "message": f"Displaying {filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/images/{filename}/rename")
async def rename_image(filename: str, new_name: dict):
    """Rename an existing image."""
    old_path = IMAGE_DIR / filename
    target_name = new_name.get("name")
    if not target_name:
        raise HTTPException(status_code=400, detail="New name required")
    
    new_path = IMAGE_DIR / target_name
    if not old_path.exists():
        raise HTTPException(status_code=404, detail="Image not found")
    
    try:
        os.rename(old_path, new_path)
        
        # If this was the active image, update config
        config = load_config()
        if config["current_image"] == filename:
            config["current_image"] = target_name
            save_config(config)
            
        return {"status": "success", "old": filename, "new": target_name}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/images/{filename}")
def delete_image(filename: str):
    """Remove an image."""
    file_path = IMAGE_DIR / filename
    if file_path.exists():
        file_path.unlink()
        
        # Cleanup config if deleted
        config = load_config()
        if config["current_image"] == filename:
            config["current_image"] = ""
            save_config(config)
            
        return {"status": "deleted"}
    return {"status": "not_found"}

# Serve Images Statically
app.mount("/images", StaticFiles(directory=str(IMAGE_DIR)), name="images")

# Serve React App (If build exists)
WWW_DIR = Path.home() / "framelab" / "www"
if WWW_DIR.exists():
    app.mount("/", StaticFiles(directory=str(WWW_DIR), html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting FrameLab Local API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
