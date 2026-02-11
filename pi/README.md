# Frame.ink - Raspberry Pi Setup

This folder contains the client software for your Inky Frame.

## Prerequisites
1.  **Hardware**: Raspberry Pi + Inky Frame (Pimoroni).
2.  **OS**: Raspberry Pi OS (Bookworm or newer recommended).
3.  **Network**: The Pi must be connected to the internet.

## Files
- `frame_client.py`: The main script that listens to Firebase and updates the screen.
- `requirements.txt`: Python dependency list.
- `install.sh`: Automated installer script.

## Installation

1.  **Transfer Files**: Copy the entire `pi` folder to your Raspberry Pi (e.g., to `~/frame-ink/pi`).
    ```bash
    scp -r pi user@frame-ink.local:~/frame-ink/
    ```

2.  **Service Account**: Ensure `service-account.json` is present.
    - If you have `_old files` on the Pi, the installer will try to find it there.
    - Otherwise, manually place `service-account.json` inside the `pi` folder.

3.  **Run Installer**:
    ```bash
    cd ~/frame-ink/pi
    sudo bash install.sh
    ```

    The installer will:
    - Install system dependencies.
    - Create a Python virtual environment.
    - Install `firebase-admin`, `inky`, etc.
    - Set up a systemd service (`frame-ink.service`) to run the client automatically on boot.
    - **Set the hostname to `frame-ink`** (accessible as `frame-ink.local`).

## One-Time Legacy Import

If you have existing images on your Pi that you want to move to the new Web App:

1.  **Locate your images folder**:
    The script looks for an `images` folder **inside the `pi` directory**.
    - If you installed to `~/frame-ink/pi`, put your images in `~/frame-ink/pi/images`.
    
    ```bash
    # Example: Copy images from another location (e.g., Pictures) to the import folder
    mkdir -p ~/frame-ink/pi/images
    cp ~/Pictures/*.jpg ~/frame-ink/pi/images/
    ```

2.  **Run the import script**:
    ```bash
    cd ~/frame-ink/pi
    sudo ./import_to_cloud.py
    ```
    *The script will print the exact folder it is scanning. Make sure your images are there!*

3.  This will upload every image to Firebase Storage and make them available in the Dashboard.

## Troubleshooting

- **Check Logs**:
    ```bash
    sudo journalctl -u frame-ink.service -f
    ```
- **Stop/Restart Service**:
    ```bash
    sudo systemctl restart frame-ink.service
    ```
