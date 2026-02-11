from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import shutil
import os
import time

# Internal Modules
from utils import update_display

app = FastAPI(title="Frame.ink API")

# --- CONFIG ---
BASE_DIR = Path(__file__).parent.absolute()
IMAGE_DIR = BASE_DIR / "images"
CONFIG_FILE = BASE_DIR / "local_config.json"

# Ensure directories exist
IMAGE_DIR.mkdir(parents=True, exist_ok=True)

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
    return {
        "status": "online",
        "time": time.ctime(),
        "storage_usage": shutil.disk_usage(BASE_DIR).used // (1024*1024),
        "image_count": len(list(IMAGE_DIR.glob("*")))
    }

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
                "size": file.stat().st_size
            })
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
        update_display(file_path)
        return {"status": "success", "message": f"Displaying {filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/images/{filename}")
def delete_image(filename: str):
    """Remove an image."""
    file_path = IMAGE_DIR / filename
    if file_path.exists():
        file_path.unlink()
        return {"status": "deleted"}
    return {"status": "not_found"}

# Serve Images Statically
app.mount("/images", StaticFiles(directory=str(IMAGE_DIR)), name="images")

# Serve React App (If build exists)
WWW_DIR = Path.home() / "frame-ink" / "www"
if WWW_DIR.exists():
    app.mount("/", StaticFiles(directory=str(WWW_DIR), html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    print("🚀 Starting Frame.ink Local API...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
