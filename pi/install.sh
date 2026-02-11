#!/bin/bash

# Frame.ink Installer
# Usage: sudo bash install.sh

echo "========================================="
echo "🖼️  Installing Frame.ink Client..."
echo "========================================="

# 1. Variables
USER_HOME=$(eval echo ~${SUDO_USER})
INSTALL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="$USER_HOME/.virtualenvs/frame-ink"
SERVICE_NAME="frame-ink.service"
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME"
USER_NAME=${SUDO_USER}

TOTAL_STEPS=7

show_banner() {
    echo ""
    echo "  ██████╗██████╗  █████╗ ███╗   ███╗███████╗    ██╗███╗   ██╗██╗  ██╗"
    echo "  ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝    ██║████╗  ██║██║ ██╔╝"
    echo "  █████╗  ██████╔╝███████║██╔████╔██║█████╗      ██║██╔██╗ ██║█████╔╝ "
    echo "  ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝      ██║██║╚██╗██║██╔═██╗ "
    echo "  ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗    ██║██║ ╚████║██║  ██╗"
    echo "  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝    ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝"
    echo "                                                       client installer"
    echo ""
}

check_network() {
    echo "      🔍 Checking internet connection..."
    if ! ping -c 1 -W 2 8.8.8.8 >/dev/null 2>&1; then
        echo "      ❌ Error: No internet connection."
        echo "         Please check your Wi-Fi settings and try again."
        exit 1
    fi
}

log_step() {
    echo "-----------------------------------------------------"
    echo "[$1/$TOTAL_STEPS] $2"
    if [ ! -z "$3" ]; then
        echo "      ⏳ Estimate: $3"
    fi
    echo "-----------------------------------------------------"
}

# Helper to show the command being run
run_visible() {
    echo "      👉 Running: $@"
    "$@"
}

# 0. Start
show_banner
check_network

# 2. Cleanup & System Health
log_step 1 "Preparing system..." "Instant"
sudo systemctl stop $SERVICE_NAME 2>/dev/null || true

# Fix "unable to resolve host" warning
CURRENT_HOSTNAME=$(hostname)
if ! grep -q "$CURRENT_HOSTNAME" /etc/hosts; then
    echo "      🔧 Fixing hostname mismatch in /etc/hosts..."
    sudo sed -i "s/127.0.1.1.*/127.0.1.1\t$CURRENT_HOSTNAME/" /etc/hosts
fi

# 3. System Dependencies
log_step 2 "Installing system dependencies..." "~2 minutes"
sudo apt-get update
# Note: we install python3-grpcio at the system level to avoid build issues on newer Python
run_visible sudo apt-get install -y python3-pip python3-venv libopenjp2-7 libtiff6 libopenblas-dev git psmisc avahi-daemon python3-grpcio python3-grpc-tools libatomic1 unzip

# 3.1 Time Synchronization (Critical for Firebase/GRPC)
echo "      🕒 Synchronizing system clock..."
run_visible sudo systemctl restart systemd-timesyncd
sleep 5
date

# 4. Virtual Environment
log_step 3 "Creating Python Environment..." "Instant"
# We force recreation to ensure --system-site-packages is active
if [ -d "$VENV_DIR" ]; then
    echo "      🔄 Refreshing environment..."
    rm -rf "$VENV_DIR"
fi
run_visible python3 -m venv --system-site-packages "$VENV_DIR"

# 5. Configuration Check
log_step 4 "Checking Configuration..." "Instant"
if [ ! -f "$INSTALL_DIR/service-account.json" ]; then
    echo "      ⚠️  Warning: service-account.json not found in $INSTALL_DIR"
    echo "         You will need to add this manually before the client can connect."
else
    echo "      ✅ Found service-account.json"
    run_visible chmod 600 "$INSTALL_DIR/service-account.json"
fi

# 6. Python Libraries
log_step 5 "Installing Python libraries..." "~3-5 minutes (via piwheels)"

# Ensure pip is up to date
run_visible "$VENV_DIR/bin/pip" install --upgrade pip

# Create constraints to avoid broken grpcio builds
echo "      🔍 Checking for grpcio version..."
SYSTEM_GRPC=$(python3 -c "import grpc; print(grpc.__version__)" 2>/dev/null || echo "")
if [ ! -z "$SYSTEM_GRPC" ]; then
    echo "      ✅ Using system grpcio: $SYSTEM_GRPC"
    # Pin it to avoid pip trying to upgrade/rebuild it
    echo "grpcio==$SYSTEM_GRPC" > "$INSTALL_DIR/constraints.txt"
    PIP_ARGS="-c $INSTALL_DIR/constraints.txt"
else
    PIP_ARGS=""
fi

run_visible "$VENV_DIR/bin/pip" install -r "$INSTALL_DIR/requirements.txt" --extra-index-url https://www.piwheels.org/simple --prefer-binary $PIP_ARGS
# Explicitly install Inky for RPi
run_visible "$VENV_DIR/bin/pip" install "inky[rpi]" --extra-index-url https://www.piwheels.org/simple --prefer-binary $PIP_ARGS

# 7. Web App (Optional)
log_step 6 "Installing Web App (Self-Hosted)..." "~1 minute"
# Check if we should install web app (default to no for now, or flag based)
# For now, we'll just check if a flag was passed or just do it if requested.
# Let's add a prompt or argument. For this implementation, we'll auto-install if the folder doesn't exist?
# Actually, let's just install it. It's small.

WEB_DIR="$USER_HOME/frame-ink/www"
if [ ! -d "$WEB_DIR" ] || [ "$1" == "--update" ]; then
    echo "      🌐 Downloading Web App from GitHub..."
    rm -rf "$WEB_DIR"
    mkdir -p "$WEB_DIR"
    
    # Download the latest release asset
    run_visible curl -L -o /tmp/frame-ink-web.zip "https://github.com/senor/frame-ink-oss/releases/latest/download/frame-ink-web.zip"
    
    if [ -f "/tmp/frame-ink-web.zip" ]; then
        echo "      📦 Extracting Web App..."
        run_visible unzip -o /tmp/frame-ink-web.zip -d "$USER_HOME/frame-ink/"
        rm /tmp/frame-ink-web.zip
        # Ensure permissions are correct for the user
        chown -R $USER_NAME:$USER_NAME "$WEB_DIR"
    else
        echo "      ❌ Failed to download web app. Using placeholder."
        echo "<h1>Frame.ink Self-Hosted</h1><p>Offline Install - Web App Missing.</p>" > "$WEB_DIR/index.html"
    fi
fi

# Create Web Service
WEB_SERVICE_FILE="/etc/systemd/system/frame-web.service"
cat <<EOF | sudo tee $WEB_SERVICE_FILE > /dev/null
[Unit]
Description=Frame.ink Web Interface
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$WEB_DIR
# Python's built-in simple HTTP server is enough for the static build
ExecStart=/usr/bin/python3 -m http.server 8080
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

echo "      🔄 Enabling Web Service..."
run_visible sudo systemctl daemon-reload
run_visible sudo systemctl enable frame-web.service
run_visible sudo systemctl restart frame-web.service
echo "      ✅ Web App active at http://frame-ink.local:8080"
# 8. Service Setup
log_step 7 "Finalizing Services..." "Instant"

# A. Cloud Client Service (frame-ink.service)
cat <<EOF | sudo tee $SERVICE_FILE > /dev/null
[Unit]
Description=Frame.ink Cloud Client (Firebase)
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$INSTALL_DIR
ExecStart=$VENV_DIR/bin/python $INSTALL_DIR/frame_client.py
Restart=always
RestartSec=10
Environment=PYTHONUNBUFFERED=1
Environment=GRPC_POLL_STRATEGY=poll
Environment=GRPC_ENABLE_FORK_SUPPORT=0

[Install]
WantedBy=multi-user.target
EOF

# B. Local API Service (frame-api.service)
API_SERVICE_FILE="/etc/systemd/system/frame-api.service"
cat <<EOF | sudo tee $API_SERVICE_FILE > /dev/null
[Unit]
Description=Frame.ink Local API (FastAPI)
After=network.target

[Service]
User=$USER_NAME
WorkingDirectory=$INSTALL_DIR
# Run uvicorn on port 8000
ExecStart=$VENV_DIR/bin/python $INSTALL_DIR/server.py
Restart=always
RestartSec=10
Environment=PYTHONUNBUFFERED=1

[Install]
WantedBy=multi-user.target
EOF

# 9. Activation
echo "      🔄 Activating services..."
run_visible sudo systemctl daemon-reload
run_visible sudo systemctl enable $SERVICE_NAME
run_visible sudo systemctl restart $SERVICE_NAME

run_visible sudo systemctl enable frame-api.service
run_visible sudo systemctl restart frame-api.service

echo "========================================="
echo "✅ Installation Complete!"
echo "   The frame is now online and listening."
echo "========================================="
echo ""
read -p "🔄 Do you want to reboot now to finalize hostname? (y/N) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "👋 Rebooting in 3 seconds..."
    sleep 3
    sudo reboot
else
    echo "👍 You can reboot manually later with 'sudo reboot'"
fi
