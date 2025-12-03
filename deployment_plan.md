# Tirona Thrift - Deployment Master Plan

## Phase 1: Separation & Setup
1. **Run the organizer:**
   ```bash
   sh organize.sh
   ```
1. **Verify Local Functionality:**
   *   **Terminal 1 (Backend):**
       ```bash
       cd backend
       npm install
       npm start
       ```
   *   **Terminal 2 (Frontend):**
       ```bash
       cd frontend
       npm install
       npm run dev
       ```

## Phase 2: GitHub Repositories
Create two separate repositories on GitHub (this is the cleanest way for auto-deployments).

1.  **Repo: `tirona-thrift-backend`**
    *   Upload the contents of the `backend/` folder.
    *   *Files to include:* `server.js`, `models.js`, `seed.js`, `package.json`, `scripts/`.

2.  **Repo: `tirona-thrift-frontend`**
    *   Upload the contents of the `frontend/` folder.
    *   *Files to include:* `src/`, `index.html`, `package.json`, `vite.config.ts`.

## Phase 3: The Plug (Backend Deployment)
**Platform:** Render.com (Web Service)

1.  **Database (MongoDB Atlas):**
    *   Create a cluster.
    *   Allow access from anywhere (0.0.0.0/0).
    *   Copy connection string.
2.  **Render Service:**
    *   Connect `tirona-thrift-backend` repo.
    *   Runtime: **Node**.
    *   Build Command: `npm install`.
    *   Start Command: `node server.js`.
    *   **Env Var:** Key: `MONGODB_URI`, Value: `(Your Atlas connection string)`.
3.  **Seed Data:**
    *   Once deployed, run this locally from your `backend` folder to fill the live DB:
        `MONGODB_URI="your_atlas_string" node seed.js`
4.  **Save the URL:** e.g., `https://tirona-backend.onrender.com`

## Phase 4: The Shop (Frontend Deployment)
**Platform:** Vercel

1.  **New Project:**
    *   Import `tirona-thrift-frontend` repo.
    *   Framework Preset: **Vite**.
2.  **Environment Variables:**
    *   `VITE_API_URL`: `https://tirona-backend.onrender.com/api` (Must match backend URL + /api)
    *   `VITE_API_KEY`: `(Your Gemini API Key)`
3.  **Deploy:**
    *   Click Deploy.

## Phase 5: Go Live
*   Visit the Vercel URL.
*   Test the "Vibe Match" to check Gemini integration.
*   Test "Secure Fit" (Checkout) to check Backend integration.
