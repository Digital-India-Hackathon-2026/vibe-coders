# AI Tutor Module

A standalone, plain JavaScript AI Tutor web module with a chat experience, lesson catalog, quiz lab, progress tracking, and study plan management.

## Features

- Chat-like tutor interface with a mock AI response engine (no API key required)
- Subject and topic filtering
- Large lesson-card catalog with detailed lesson content
- Quiz generation and quiz-taking workflow
- Local progress persistence via `localStorage`
- Study plan / to-do tracker with completion and cleanup
- Modular architecture (`components`, `services`, `state`, `utils`, `data`, `ai`)

## Folder Structure

```text
ai-tutor/
├── index.html
├── README.md
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   └── themes.css
└── js/
    ├── main.js
    ├── app.js
    ├── ai/
    │   └── mockTutorEngine.js
    ├── components/
    │   ├── chatPanel.js
    │   ├── lessonCards.js
    │   ├── lessonViewer.js
    │   ├── progressDashboard.js
    │   ├── quizPanel.js
    │   ├── studyPlan.js
    │   └── topicSelector.js
    ├── data/
    │   ├── lessons.js
    │   └── subjects.js
    ├── services/
    │   ├── lessonService.js
    │   ├── progressService.js
    │   ├── quizService.js
    │   ├── storageService.js
    │   └── studyPlanService.js
    ├── state/
    │   └── store.js
    └── utils/
        ├── constants.js
        ├── dom.js
        └── formatters.js
```

## Run / Usage

Because this module uses ES Modules in the browser, serve it from a local HTTP server (not direct `file://`).

### Option 1: Python server

```bash
cd ai-tutor
python -m http.server 5500
```

Open: `http://localhost:5500`

### Option 2: Any static server

Serve the `ai-tutor/` folder root and open `index.html`.

## How to Use

1. Pick a subject and topic from **Subject & Topic Explorer**.
2. Open a lesson card and review the lesson content.
3. Click **Mark as Studied** to update progress.
4. Click **Generate Quiz** to create a lesson quiz and submit answers.
5. Ask questions in **Ask the Tutor** chat; responses are generated from a local rule-based tutor engine.
6. Add tasks in **Study Plan** and mark them complete as you go.

## Data & Persistence

The app stores all user/session data in `localStorage`:

- selected subject/topic and lesson progress
- chat messages
- study plan tasks
- quiz attempts and scores

No external API calls or credentials are required.

## Notes

- Lesson data is intentionally substantial to support broad practice and content rendering.
- This module is isolated under `ai-tutor/` and does not change existing repository app behavior.
