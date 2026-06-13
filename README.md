# React + Vite
# 🎬 TubeGazer — Creator Intelligence Dashboard
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
A modern, high-performance dashboard for content creators to track video metrics, manage uploads, check copyrights, analyze viewer retention, and coordinate cross-platform distribution. Built with React 19, React Router v7, and styled with a custom high-fidelity glassmorphic dark theme.
Currently, two official plugins are available:
---
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
## 🚀 Live Demo & Preview
## React Compiler
* **Live Demo Link:** `https://tubegazer-studio.vercel.app` *(Replace with your deployed URL)*
* **Demo Credentials:**
  * **Username:** `studio`
  * **Password:** `tubegazer123`
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
### 📱 Dashboard Mockup / Screenshot
*A visual preview of the glassmorphism layout, featuring analytics widgets, copyright checker, and cross-platform indicators:*
## Expanding the ESLint configuration
![TubeGazer Dashboard Mockup](./public/screenshot.png)
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
---
## 🛠️ Tech Stack
* **Frontend Library:** [React 19](https://react.dev/) (Functional components, custom Hooks, Context API)
* **Build Tool & Dev Server:** [Vite](https://vite.dev/) (Lightning-fast HMR)
* **Router:** [React Router v7](https://reactrouter.com/) (Declarative client-side routing and page guards)
* **Styling:** Vanilla CSS3 (Custom-built dark mode, CSS custom properties, grid/flexbox, Glassmorphic cards, transition animations)
* **State Management:** React Context (`AuthContext`, `ChannelContext`) + React State Hook (`useState`, `useReducer`)
* **Persistence:** Web Storage API (`localStorage` for user sessions and channel links)
* **External Integration:** [DummyJSON API](https://dummyjson.com/) (Dynamic creator tips and community news feed)
---
## ✨ Core Features
### 1. 🔐 Session-Persistent Authentication
* **Secure Login & Account Creation:** Tabbed authentication panels saving registered credentials securely in `localStorage`.
* **State Guarding:** Redirects unauthenticated users to the Login page; automatically restores existing sessions on page reload using a spinner-guarded hook.
* **Easy Access:** Quick demo login credentials provided right on the form for testers.
### 2. 📊 Video Stats Dashboard
* **Dynamic Grid:** Interactive cards displaying view counts, description summaries, performance remarks, and copyright status.
* **Status Tags:** Instantly highlights video processing states (e.g., Safe, Warning, Processing, or Failed).
### 3. ⏪ Watch History Undo & Playback Tracker
* **Position Monitoring:** Tracks precise video viewing states (current vs. total duration) with secondary backup counters.
* **Accidental Fast-Forward Protection:** An undo manager allowing creators to instantly revert unwanted skips and jump back to their last stable watched position.
### 4. 🔀 Up-Next Recommendation Queue
* **Dynamic Reordering:** Lines up videos in a set sequence.
* **Queue Controls:** Move items to the top, bump down, or remove videos dynamically to preview recommended playback flows.
### 5. 🛡️ instant Copyright Checker
* **Digital Signature Verification:** Verifies individual video file hashes against a local mock database of licensed media assets.
* **Instant Feedback:** Displays clean success badges for licensed material or warning flags for flag-matched hashes.
### 6. 📉 Viewer Retention Sorter
* **Ranking Engine:** Sorts creator videos instantly using memoized logic (`useMemo`).
* **Multi-Metric Sorting:** Rank videos by average watch duration, total view counts, or user engagement (likes).
### 7. 📅 Best Time to Upload Predictor
* **Heatmap Matrix:** Visualizes weekday vs. hourly engagement averages derived from historical video data.
* **AI Recommendations:** Suggests the top 3 best posting times to maximize initial viewer reach.
### 8. 🌐 Cross-Platform Reach Panel
* **Aggregated Stats:** Displays stats (subscribers, views, engagement rate) for YouTube, Instagram, X (Twitter), and TikTok.
* **Distribution Tips:** Click on platform cards to read tailored content advice (e.g., Reels length, Shorts posting frequency).
* **Copy-to-Clipboard Hub:** Quickly copy channel URLs to share with other networks.
### 9. ⚠️ Processing Safety & Fallbacks
* **Input Protection:** Hides configuration panels for broken or corrupted video files.
* **Resilient Layout:** Displays beautiful fallback error boxes, ensuring the entire dashboard doesn't crash on failed API/media loads.
---
## 📂 Project Structure
```text
tubegazer/
├── public/
│   ├── favicon.svg
│   └── screenshot.png          # Visual mockup/screenshot image
├── src/
│   ├── assets/                 # SVGs and static assets
│   ├── components/             # Reusable UI component modules
│   │   ├── BestTimePredictor.jsx
│   │   ├── ChannelLinkHub.jsx
│   │   ├── CopyrightChecker.jsx
│   │   ├── CreatorFeed.jsx
│   │   ├── CrossPlatformReach.jsx
│   │   ├── Navbar.jsx
│   │   ├── NextVideoQueue.jsx
│   │   ├── QualityOptimizer.jsx
│   │   ├── RetentionSorter.jsx
│   │   ├── Sidebar.jsx
│   │   ├── VideoCard.jsx
│   │   ├── VideoProcessingSafety.jsx
│   │   ├── VideoStatsDashboard.jsx
│   │   └── WatchHistoryUndo.jsx
│   ├── context/                # Context Providers (Auth, Channel stats)
│   │   ├── AuthContext.jsx
│   │   ├── AuthProvider.jsx
│   │   ├── ChannelContext.jsx
│   │   └── ChannelProvider.jsx
│   ├── data/                   # Video & Platform dataset definitions
│   │   └── video.js
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useFetchFeed.js
│   │   └── useVideoSearch.js
│   ├── pages/                  # Route level container components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── VideoDetail.jsx
│   ├── App.jsx                 # Routes config and Core Layout
│   ├── index.css               # Main custom design system stylesheets
│   └── main.jsx                # DOM attachment and providers initialization
├── index.html
├── package.json
└── vite.config.js
```
---
## ⚙️ Setup & Running Instructions
Another developer can run this project locally without any external tools other than Node.js. Follow these simple steps:
### 1. Prerequisites
Ensure you have **Node.js** installed (version `18.x` or higher recommended). Check your version:
```bash
node -v
```
### 2. Install Dependencies
Navigate to the root directory and install all required node modules:
```bash
npm install
```
### 3. Start the Development Server
Launch the local dev server using Vite:
```bash
npm run dev
```
By default, the application will boot up at:
👉 **[http://localhost:5173](http://localhost:5173)** (or `5174` if `5173` is occupied).
### 4. Build for Production
To bundle the application for production deployment:
```bash
npm run build
```
The optimized files will be built inside the `dist/` directory, ready to be served on any static hosting platform (Vercel, Netlify, Firebase, GitHub Pages).
### 5. Preview Production Build
You can test the built assets locally using:
```bash
npm run preview
```
