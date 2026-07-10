# Vibe Coders 🚀

> Repository for **Hackathon Team Vibe Coders** — an AI-powered coding platform built for developers.

---

## ✨ Features

- 🤖 **AI Code Explanation** — Get instant, in-depth explanations for any code snippet
- 📊 **Analytics Dashboard** — Track coding activity, language usage, and performance metrics
- 🛡️ **Admin Panel** — Manage users, view platform stats, and moderate content
- 🔐 **Authentication** — Secure login and session management via `useAuth`
- 🌍 **Language Detection** — Auto-detect programming languages from code input
- 📜 **Compilation History** — Review past compilations and AI interactions
- 💡 **AI Tutor Panel** — Interactive AI tutor for guided learning
- 🧠 **AI Tutor Web Module** — Standalone plain JS tutor app in `ai-tutor/`

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (JSX), CSS Modules |
| AI | OpenAI / Custom AI Utils |
| Analytics | Custom analytics engine |
| Auth | Custom `useAuth` hook |

---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gampashashank30/vibe-coders.git
cd vibe-coders

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 📁 Project Structure

```
vibe-coders/
├── index.html              # Main HTML entry point
├── login.html              # Login page
├── App.module.css          # Global app styles
├── AIExplanationTab.jsx    # AI code explanation component
├── AdminDashboard.jsx      # Admin dashboard
├── AnalyticsPanel.jsx      # Analytics panel
├── AiTutorPanel.module.css # AI tutor styles
├── aiCodeUtils.js          # AI utility functions
├── analytics.js            # Analytics logic
├── api.js                  # API integration layer
├── compilationHistory.js   # Compilation history tracker
├── languageDetector.js     # Language detection engine
└── useAuth.js              # Authentication hook
```

Additional standalone module:

```
vibe-coders/ai-tutor/       # Plain JS/CSS/HTML AI tutor experience
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT © Vibe Coders Team