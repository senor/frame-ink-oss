from pathlib import Path
from PIL import Image, ImageOps
import sys

# HARDWARE SETUP
try:
    from inky.auto import auto
    inky = auto()
    HAS_INKY = True
    print(f"✅ Inky Detected: {inky.resolution}")
except ImportError:
    HAS_INKY = False
    print("⚠️  Simulation Mode (No Inky detected)")

def update_display(image_path: Path):
    """
    Loads an image, processes it for the Inky display, and updates the screen.
    """
    try:
        print(f"🖼️  Processing: {image_path}")
        img = Image.open(image_path)
        img = ImageOps.exif_transpose(img)
        
        if HAS_INKY:
            # Resize and rotate for the specific panel
            img = img.rotate(90, expand=True).resize(inky.resolution, Image.LANCZOS)
            inky.set_image(img)
            inky.show()
            print("✨ Display Updated Successfully")
        else:
            print(f"📺 [SIMULATION] Display would show: {image_path}")
            
    except Exception as e:
        print(f"❌ Display Error: {e}")
        raise e

def get_local_ip():
    """Retrieve the primary local IP address of the system."""
    import socket
    try:
        # This doesn't actually connect but helps find the right interface
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"
