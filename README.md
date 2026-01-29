# Pastebin Lite

A minimal Pastebin-like web application built as a take-home assignment.

Users can paste text, generate a unique shareable URL, and view the content later using that URL.

---

## ✨ Features

- Create a text paste
- Generate a unique shareable link
- View paste using the link
- Minimal and clean UI
- Health check API endpoint

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Global CSS
- **Storage:** SQLite (local file-based DB)
- **Deployment:** Vercel

---

## 📂 Project Structure

src/app/page.tsx → Home page (Create Paste)
src/app/p/[id]/page.tsx → View Paste
src/app/api/pastes → Create/Get Paste API
src/app/api/healthz → Health check endpoint
src/lib/store.ts → SQLite data access
data/pastes.db → SQLite database


---

## 🚀 Getting Started (Local)

### 1. Install dependencies
```bash
npm install


2. Run development server
npm run dev

3. Open in browser
http://localhost:3000

🔗 API Endpoints

Create Paste

POST /api/pastes
Body: { "content": "your text" }

Get Paste
GET /api/pastes/{id}

Health Check
GET /api/healthz

⚠️ Notes on Persistence

This project uses a local SQLite file (data/pastes.db).

When deployed on Vercel:

Data persistence is temporary

Suitable for demo and assignment scope

Can be replaced with hosted DB (Postgres/Redis) if required

✅ Assignment Alignment

✔ Meets all problem requirements
✔ Clean architecture
✔ Clear separation of UI, API, and storage
✔ Simple, readable, maintainable code

📌 Future Improvements (Optional)


Add paste expiration
Syntax highlighting
Authentication
Hosted database