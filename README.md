# ScanContext

**Local-first medical image viewer, report organizer, and AI-assisted
annotation tool.** Runs entirely on your own computer — Windows, macOS, or
Linux.

> ⚠️ **Not a medical device. Not a diagnosis.**
> ScanContext helps you organize, view, and understand medical imaging and
> reports, and prepare questions for your doctor. It does **not** diagnose any
> condition. Every result — especially anything AI-suggested — must be
> confirmed by a qualified clinician.

---

## ⬇️ Download & install

No GitHub account, no source code, no terminal needed.

### 1. Install Docker Desktop (free, one time)

ScanContext runs inside Docker. Install Docker Desktop:

**<https://www.docker.com/products/docker-desktop/>**

Open it once after installing and wait until it says **"running"**.

### 2. Download ScanContext

Get the latest bundle from the **[Releases page](../../releases/latest)** —
the file named `ScanContext-<version>.zip`. Unzip it anywhere (Desktop,
Documents…).

### 3. Start it

| System  | Do this |
|---------|---------|
| Windows | Double-click **`Start ScanContext.bat`** |
| macOS   | Double-click **`Start ScanContext.command`** |
| Linux   | Run `sh ./start.sh` in the folder |

The first start downloads the app (a few minutes). When it is ready your
browser opens at **http://localhost:5173**, and a short guided tour begins.
Reopen help any time with the **"?"** button.

### Stopping it

Double-click **`Stop ScanContext.bat`** (Windows) or run `sh ./stop.sh`
(macOS / Linux). Your data is always kept.

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

Built and maintained by **Nik Reljin** · [GitHub](https://github.com/nikolareljin)
· [LinkedIn](https://www.linkedin.com/in/nikolareljin)
