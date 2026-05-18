# ScanContext

**Local-first medical image viewer, report organizer, and AI-assisted
annotation tool.** Runs entirely on your own computer — Windows, macOS, or
Linux.

> ⚠️ **Not a medical device. Not a diagnosis.**
> ScanContext helps you organize, view, and understand medical imaging and
> reports, and prepare questions for your doctor. It does **not** diagnose any
> condition. Every result — especially anything AI-suggested — must be
> confirmed by a qualified clinician.

<img width="1900" height="841" alt="image" src="https://github.com/user-attachments/assets/99b8ed13-2ca9-4af6-a96a-1c2799edf3e9" />


**Quick links:**
[⬇️ Download](https://github.com/nikolareljin/scancontext/releases/latest) ·
[🐳 Docker Desktop](https://www.docker.com/products/docker-desktop/) ·
[🐞 Report a problem](https://github.com/nikolareljin/scancontext/issues) ·
[☕ Donate](https://ko-fi.com/nikolareljin)

---

## ⬇️ Download & install

No GitHub account, no source code, and no terminal needed.

There are **two ways to run ScanContext** — pick whichever you prefer. Both
need Docker Desktop, so do Step 1 either way.

### Step 1 — Install Docker Desktop (free, one time)

ScanContext runs inside Docker. Install Docker Desktop for your system:

**<https://www.docker.com/products/docker-desktop/>**

- Windows: <https://docs.docker.com/desktop/install/windows-install/>
- macOS: <https://docs.docker.com/desktop/install/mac-install/>
- Linux: <https://docs.docker.com/desktop/install/linux/>

After installing, **open Docker Desktop once** and wait until it says
**"running"**. You only ever do this once.

### Step 2 — Choose how to run ScanContext

All downloads are on the **[Releases page](https://github.com/nikolareljin/scancontext/releases/latest)**.

#### Option A — The ScanContext app (recommended, easiest)

A small desktop app that starts and stops ScanContext for you with one click —
no scripts, no files to manage. Download the installer for your system:

| System  | Download | Install |
|---------|----------|---------|
| Windows | `ScanContext_<version>_x64-setup.exe` | Double-click, follow the installer |
| macOS   | `ScanContext_<version>_<arch>.dmg` | Open the `.dmg`, drag **ScanContext** to Applications |
| Linux   | `ScanContext_<version>_amd64.AppImage` | `chmod +x` the file, then double-click — or install the `.deb` / `.rpm` |

Then open **ScanContext** like any other app. It checks Docker, downloads the
app on first run, and opens it in your browser. Use the window — or the tray /
menu-bar icon — to **Start**, **Stop**, and **Open** ScanContext any time.

> **First launch — unsigned app warning.** These installers are not yet
> code-signed, so your system may warn you the first time:
> - **macOS:** right-click the app → **Open** → **Open**. (Or System Settings →
>   Privacy & Security → **Open Anyway**.)
> - **Windows:** on the blue SmartScreen prompt, click **More info** →
>   **Run anyway**.
>
> You only need to do this once.

#### Option B — The download bundle (`.zip`)

If you would rather not install an app, download the bundle and double-click a
start file:

1. Download `ScanContext-<version>.zip` from the
   [Releases page](https://github.com/nikolareljin/scancontext/releases/latest)
   and unzip it anywhere (Desktop, Documents…).
2. Open the unzipped folder and start it:

   | System  | Do this |
   |---------|---------|
   | Windows | Double-click **`Start ScanContext.bat`** |
   | macOS   | Double-click **`Start ScanContext.command`** |
   | Linux   | Run `sh ./start.sh` in the folder |

The first start downloads the app (a few minutes). When it is ready your
browser opens **ScanContext**, and a short guided tour begins. Reopen help any
time with the **"?"** button.

### Stopping it

- **App (Option A):** click **Stop** in the window or the tray / menu-bar icon.
- **Bundle (Option B):** double-click **`Stop ScanContext.bat`** (Windows) or
  run `sh ./stop.sh` (macOS / Linux).

Your studies and data are always kept between runs.

---

## System requirements

- **Windows 10/11**, **macOS 12+**, or a modern **Linux** desktop.
- **Docker Desktop** installed and running.
- ~4 GB free disk space for the app images, plus room for your studies.
- A modern browser (Chrome, Edge, Firefox, or Safari).

---

## What it does

- Import DICOM studies, images, ZIPs, PDFs, and text reports.
- View images and DICOM in a web viewer; draw and save annotations.
- Extract and (optionally) translate non-English reports to English.
- Optionally use AI to summarize reports and suggest regions to review —
  clearly labeled "candidate findings, not a diagnosis".
- Export a doctor-friendly summary to share at an appointment.

**Your data stays on your machine.** Nothing is uploaded anywhere unless you
explicitly turn on a cloud AI provider in Settings. AI is **off by default**.

---

## Optional — connect an AI provider

AI is **off by default** and entirely optional — ScanContext works fully
without it. When you turn it on, it can summarize reports, translate
non-English reports, and suggest regions of an image worth a closer look —
always labeled "candidate findings, not a diagnosis".

You can use any one of these providers:

| Provider | Get a key / install | Notes |
|----------|---------------------|-------|
| **Google Gemini** | <https://aistudio.google.com/apikey> | Recommended — free tier to try, paid tier for real use |
| Anthropic Claude | <https://console.anthropic.com/settings/keys> | Paid API |
| OpenAI | <https://platform.openai.com/api-keys> | Paid API |
| Ollama | <https://ollama.com/download> | Fully local — no key, nothing leaves your computer |

When a cloud provider is enabled, image/report data **for the study you
choose** may be sent to that provider — ScanContext strips patient identifiers
first. Ollama keeps everything on your machine.

### Setting up Google Gemini (recommended)

**1. Get an API key.** Open <https://aistudio.google.com/apikey>, sign in with
a Google account, click **Create API key**, and copy it (it looks like
`AIza…`). Keep it private — treat it like a password.

**2. Turn on billing — important for medical privacy.** A new key starts on the
free tier. Open the key's Google Cloud project and enable billing (the **paid
tier**):

> ⚠️ **Anonymization only protects you on the paid tier.** ScanContext strips
> patient identifiers before sending anything to Gemini — but on the **free
> tier, Google may still use your (anonymized) images and reports to improve
> its models**. Only the **paid tier** stops that. The anonymization step does
> not give you real privacy on the free tier — for actual medical data, use the
> paid tier.

- The most thorough model (`gemini-2.5-pro`) and reliable speed need the paid
  tier.
- You can set a **budget cap** in Google Cloud so there are no surprises.

**3. Add the key to ScanContext.** Open the `.env` configuration file and set
these four lines:

```ini
AI_PROVIDER=gemini
CLOUD_AI_ENABLED=true
GEMINI_API_KEY=AIza...your-key...
GEMINI_MODEL=gemini-2.5-flash
```

Where the `.env` file lives:

| How you installed ScanContext | `.env` location |
|-------------------------------|-----------------|
| Download bundle (`.zip`)      | Inside the unzipped `ScanContext-<version>` folder |
| ScanContext app — Windows     | `%APPDATA%\com.nikolareljin.scancontext\.env` |
| ScanContext app — macOS       | `~/Library/Application Support/com.nikolareljin.scancontext/.env` |
| ScanContext app — Linux       | `~/.local/share/com.nikolareljin.scancontext/.env` |

**4. Restart ScanContext** so it loads the key — **Stop**, then **Start**.

Then open a study and use **Analyze study**; you confirm cloud use per study.

### Which Gemini model?

| You want… | Set `GEMINI_MODEL` to |
|-----------|-----------------------|
| Cheap, fast, good for everyday use | `gemini-2.5-flash` (default) |
| The most thorough analysis | `gemini-2.5-pro` |

### What does it cost?

Gemini charges per use, and ScanContext only calls it when you ask it to
analyze a study. The cost per study is **capped by design** — ScanContext
reviews at most about a dozen sampled images no matter how many slices a scan
has, so a huge scan costs the same as a small one.

| Model | Cost to analyze one scan / series |
|-------|-----------------------------------|
| `gemini-2.5-flash` | roughly **2–3 cents** |
| `gemini-2.5-pro` | roughly **10–20 cents** |

Even heavy use — 100 studies in a month — is about **$2–3 on Flash** or
**$10–20 on Pro**. Summarizing or translating a text report costs a fraction
of a cent. Prices are set by Google; current rates: <https://ai.google.dev/pricing>.

---

## Troubleshooting

- **"Docker is not installed" / "not running".** Install Docker Desktop, open
  it, and wait until it says **"running"** — then start ScanContext again.
- **The app says Docker is missing but it is installed (macOS).** Make sure
  Docker Desktop has been launched at least once; the ScanContext app looks for
  it in the standard locations.
- **A port is already in use.** ScanContext uses ports `5173`, `8000`, and
  `8042` on your machine. If `5173` is taken, change `FRONTEND_PORT` in the
  `.env` file and start again. The backend (`8000`) and Orthanc (`8042`) ports
  are built into the app, so changing `BACKEND_PORT` / `ORTHANC_PORT` only
  moves the containers and breaks the browser app — if one of those ports is
  taken, free it up instead.
- **First start is slow.** The first run downloads the app images (a few
  minutes). Later starts are fast.
- **Still stuck?** Open an issue:
  <https://github.com/nikolareljin/scancontext/issues>

---

## 💛 Support ScanContext

ScanContext is **free** and built by one independent developer. If it saved you
time or worry, a one-time **$10 donation** keeps it maintained and improving —
any amount helps:

**☕ <https://ko-fi.com/nikolareljin>**

---

## Privacy & safety

- ScanContext is not a diagnostic tool and not a substitute for professional
  medical advice.
- Medical files may contain personal health information. Keep your downloaded
  folder and any exports private.
- Cloud AI is opt-in. When enabled, image/report data may be sent to the
  provider you choose; ScanContext strips patient identifiers first.
- That anonymization only gives you real privacy on a **paid** provider plan.
  On Google Gemini's **free tier**, your anonymized data may still be used by
  Google to improve its models — use the **paid tier** for genuine medical
  data, or use **Ollama** to keep everything on your own machine.

Built and maintained by **Nik Reljin** · [GitHub](https://github.com/nikolareljin)
· [LinkedIn](https://www.linkedin.com/in/nikolareljin)
