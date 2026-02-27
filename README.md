<p align="center">
  <img src="https://img.shields.io/badge/platform-Raspberry%20Pi-C51A4A?style=for-the-badge&logo=raspberrypi&logoColor=white" alt="Raspberry Pi" />
  <img src="https://img.shields.io/badge/display-Inky%20Impression%207.3%22-FF6B00?style=for-the-badge" alt="Inky Impression" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=for-the-badge" alt="MIT License" />
  <img src="https://img.shields.io/badge/python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python 3.9+" />
</p>

<h1 align="center">
  🖼️ FrameLab — Self-Hosted
</h1>

<p align="center">
  <strong>Turn your Raspberry Pi + Inky Impression into a premium digital art frame.</strong><br />
  No cloud. No accounts. Fully yours.
</p>

<p align="center">
  <a href="https://framelab.ink"><strong>🌐 See the Live Project →</strong></a>
</p>

---

## What is FrameLab?

**FrameLab** is a complete software ecosystem that transforms a Raspberry Pi and [Pimoroni Inky Impression 7.3"](https://shop.pimoroni.com/products/inky-impression-7-3) e-ink display into a beautifully managed art frame.

This **self-hosted edition** gives you the full experience — a local web dashboard, image management, and hardware control — with zero cloud dependencies. Everything runs on your local network.

> **🌐 Cloud version available at [framelab.ink](https://framelab.ink)** — If you prefer a managed experience with real-time sync, Firebase-backed storage, and remote access, check out the hosted version.

### ✨ Key Features

| Feature | Description |
|---|---|
| **🎨 Browser-Based Dashboard** | Upload, crop, and manage art from any device on your network |
| **📐 Pixel-Perfect Simulator** | Preview exactly how images will render on the 7-color e-ink palette |
| **⚡ One-Command Setup** | Automated installer handles dependencies, services, and the web app |
| **🔒 Privacy First** | No cloud, no telemetry, no accounts — your art stays on your network |
| **🔄 Live Hardware Control** | Push images to the physical frame directly from the web UI |
| **📡 Zero-Conf Discovery** | Find your frame at `framelab.local` via mDNS — no IP hunting |
| **🛠️ Systemd Services** | Auto-start on boot, auto-restart on crash — set it and forget it |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Your Network                     │
│                                                     │
│   ┌──────────────┐         ┌─────────────────────┐  │
│   │  📱 Browser  │  HTTP   │   🍓 Raspberry Pi   │  │
│   │  Any Device  │ ◄─────► │                     │  │
│   └──────────────┘         │  ┌───────────────┐  │  │
│                            │  │ React Web App │  │  │
│                            │  │   :8080       │  │  │
│                            │  └───────────────┘  │  │
│                            │  ┌───────────────┐  │  │
│                            │  │ FastAPI Local  │  │  │
│                            │  │ API  :8000     │  │  │
│                            │  └───────┬───────┘  │  │
│                            │          │          │  │
│                            │  ┌───────▼───────┐  │  │
│                            │  │ Inky 7.3" HAT │  │  │
│                            │  │ E-Ink Display  │  │  │
│                            │  └───────────────┘  │  │
│                            └─────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

The system runs three lightweight services on the Pi:

| Service | Port | Purpose |
|---|---|---|
| `framelab-web` | `8080` | Serves the React dashboard |
| `framelab-api` | `8000` | Local REST API (FastAPI + Uvicorn) |
| `framelab` | — | Hardware client (Firebase listener, optional) |

---

## Hardware Requirements

| Component | Recommendation |
|---|---|
| **Board** | Raspberry Pi Zero 2 W, Pi 3, Pi 4, or Pi 5 |
| **Display** | [Pimoroni Inky Impression 7.3"](https://shop.pimoroni.com/products/inky-impression-7-3) (7-color e-ink) |
| **OS** | Raspberry Pi OS Lite — Bookworm or newer |
| **Storage** | 8 GB+ microSD |
| **Network** | Wi-Fi or Ethernet |

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/senor/frame-ink-oss.git ~/framelab
cd ~/framelab
```

### 2. Run the installer

```bash
sudo bash pi/install.sh
```

The installer takes care of everything:

```
 ┌─────────────────────────────────────────────────┐
 │  ██████╗██████╗  █████╗ ███╗   ███╗███████╗     │
 │  ██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝     │
 │  █████╗  ██████╔╝███████║██╔████╔██║█████╗       │
 │  ██╔══╝  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══╝       │
 │  ██║     ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗     │
 │  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     │
 │                          client installer         │
 ├─────────────────────────────────────────────────┤
 │  [1/7] Preparing system              ⏳ Instant  │
 │  [2/7] System dependencies           ⏳ ~2 min   │
 │  [3/7] Python environment            ⏳ Instant  │
 │  [4/7] Configuration check           ⏳ Instant  │
 │  [5/7] Python libraries              ⏳ ~3-5 min │
 │  [6/7] Web App download              ⏳ ~1 min   │
 │  [7/7] Service activation            ⏳ Instant  │
 └─────────────────────────────────────────────────┘
```

### 3. Open the dashboard

Navigate to one of:

```
http://framelab.local:8080
http://<your-pi-ip>:8080
```

That's it. Start uploading art. 🎨

---

## API Reference

The local API runs on port `8000` and exposes the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/status` | System health, storage usage, refresh state |
| `GET` | `/api/config` | Current device configuration |
| `POST` | `/api/config` | Update rotation, interval, etc. |
| `GET` | `/api/images` | List all stored images |
| `POST` | `/api/upload` | Upload a new image (multipart) |
| `POST` | `/api/display/{filename}` | Push an image to the e-ink display |
| `POST` | `/api/images/{filename}/rename` | Rename an image |
| `DELETE` | `/api/images/{filename}` | Delete an image |

**Example — Push an image:**

```bash
# Upload
curl -X POST http://framelab.local:8000/api/upload \
  -F "file=@my-artwork.jpg"

# Display it
curl -X POST http://framelab.local:8000/api/display/my-artwork.jpg
```

---

## Updating

Pull the latest code and re-run the installer with the `--update` flag to fetch the newest web app release:

```bash
cd ~/framelab
git pull
sudo bash pi/install.sh --update
```

The `--update` flag forces a fresh download of the React dashboard from [GitHub Releases](https://github.com/senor/frame-ink-oss/releases).

---

## Project Structure

```
framelab/
├── pi/                        # Everything that runs on the Raspberry Pi
│   ├── install.sh             # One-command automated installer
│   ├── frame_client.py        # Hardware client (Firebase listener)
│   ├── server.py              # Local FastAPI server
│   ├── utils.py               # Display driver utilities
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Pi-specific documentation
├── src/                       # React dashboard source (Vite + TypeScript)
├── public/                    # Static assets & branding
├── .github/workflows/
│   └── release.yml            # CI: Auto-build self-hosted bundles on tag
├── LICENSE                    # MIT
└── README_SELF_HOSTED.md      # ← You are here
```

---

## How It Works

### Image Pipeline

```
  Browser                    Pi API                   E-Ink Display
  ┌──────┐    Upload     ┌─────────┐   Dither +    ┌─────────────┐
  │ Crop │ ────────────► │ FastAPI │ ──Rotate────► │ Inky 7.3"   │
  │ & UI │    POST       │ :8000   │   Floyd-      │ 800×480     │
  └──────┘    /upload    └─────────┘   Steinberg    │ 7-color     │
                                                    └─────────────┘
```

1. **Upload** — The browser dashboard sends a cropped image to the local API.
2. **Process** — The Python backend applies rotation and resizes to the native `800×480` resolution.
3. **Dither** — The image is quantized to the Inky Impression's 7-color palette using Floyd-Steinberg dithering.
4. **Display** — The processed image is pushed to the physical e-ink panel. Refresh takes ~22 seconds.

### Service Management

All services are managed by `systemd` and start automatically on boot:

```bash
# View live logs
sudo journalctl -u framelab-api.service -f

# Restart all FrameLab services
sudo systemctl restart framelab.service
sudo systemctl restart framelab-api.service
sudo systemctl restart framelab-web.service

# Check status
sudo systemctl status framelab-api.service
```

---

## Cloud Mode (Optional)

While this README focuses on the **self-hosted** experience, FrameLab also supports a **cloud-managed** mode via Firebase. This enables:

- 🌍 **Remote access** — Update your frame from anywhere in the world
- 🔄 **Real-time sync** — Instant updates via Firestore listeners
- ☁️ **Cloud gallery** — Art stored securely in Firebase Storage
- 🔐 **Authentication** — Google & GitHub sign-in

> See the live cloud version at **[framelab.ink](https://framelab.ink)**

To enable cloud mode, add your Firebase credentials to a `service-account.json` file in the `pi/` directory. The `framelab.service` will automatically connect to your Firestore project.

---

## Releasing a New Version (For Contributors)

To publish a new self-hosted web app release:

```bash
# 1. Tag the release
git tag v1.0.1
git push origin v1.0.1

# 2. GitHub Actions takes over:
#    → Builds the React app in self_hosted mode
#    → Packages it as framelab-web.zip
#    → Uploads to the GitHub Release

# 3. Users update with:
sudo bash pi/install.sh --update
```

---

## Troubleshooting

<details>
<summary><strong>🔴 Display not updating</strong></summary>

Check if the API service is running and the display isn't mid-refresh (~22s per update):

```bash
sudo systemctl status framelab-api.service
curl http://localhost:8000/api/status
```

If `is_refreshing` is `true`, wait for the current refresh to complete.

</details>

<details>
<summary><strong>🔴 Can't reach framelab.local</strong></summary>

Ensure mDNS / Avahi is running:

```bash
sudo systemctl status avahi-daemon
```

Alternatively, find your Pi's IP with `hostname -I` and access directly via `http://<IP>:8080`.

</details>

<details>
<summary><strong>🔴 Installer fails at Python libraries</strong></summary>

On Raspberry Pi OS Bookworm, `grpcio` can be tricky to build. The installer handles this by using system-level packages with `--system-site-packages`. If you still see build errors:

```bash
sudo apt-get install -y python3-grpcio python3-grpc-tools
```

Then re-run the installer.

</details>

<details>
<summary><strong>🔴 Time sync / SSL errors</strong></summary>

Firebase and other network services require accurate system time:

```bash
sudo systemctl restart systemd-timesyncd
timedatectl status
```

</details>

---

## Contributing

Contributions are welcome! Whether it's bug fixes, new features, or documentation improvements — feel free to open an issue or submit a pull request.

```bash
# Fork → Clone → Branch → Code → PR
git checkout -b feature/my-feature
# ... make changes ...
git push origin feature/my-feature
```

### Development Setup

```bash
# Install frontend dependencies
npm install

# Start the Vite dev server (for dashboard development)
npm run dev

# Sync Pi files during development
npm run sync:pi
```

---

## Design Philosophy

FrameLab's design language is inspired by **technical schematics and laboratory blueprints** — a deliberate contrast to the glossy, notification-heavy interfaces of modern apps.

| Token | Value | Purpose |
|---|---|---|
| **Paper** | `#EBE6D7` | Warm, pulped-paper background — low eye strain |
| **Void** | `#1D1D1B` | Deep carbon black for technical linework |
| **Signal Blue** | — | System status and connectivity |
| **Signal Orange** | — | Active states and interactions |
| **Signal Gold** | — | Highlights and accents |

> *The interface should feel as intentional and permanent as the art it displays.*

---

## License

[MIT](LICENSE) © 2026 Jasa Zelma

You are free to use, modify, and distribute this software. Attribution is appreciated but not required.

---

<p align="center">
  <strong>Built with 🧡 by a Solo + Agentic Development Team</strong><br/>
  <sub>One human. One AI. One beautiful frame.</sub>
</p>
