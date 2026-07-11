import { DEFAULT_APP_STATE, STORAGE_KEYS } from '../utils/constants.js';
import { loadJson, saveJson } from '../services/storageService.js';

const state = {
  app: {
    ...DEFAULT_APP_STATE,
    ...loadJson(STORAGE_KEYS.APP_STATE, {})
  },
  chatLog: loadJson(STORAGE_KEYS.CHAT_LOG, []),
  studyPlan: loadJson(STORAGE_KEYS.STUDY_PLAN, []),
  quizHistory: loadJson(STORAGE_KEYS.QUIZ_HISTORY, [])
};

const listeners = new Set();

const persist = () => {
  saveJson(STORAGE_KEYS.APP_STATE, state.app);
  saveJson(STORAGE_KEYS.CHAT_LOG, state.chatLog);
  saveJson(STORAGE_KEYS.STUDY_PLAN, state.studyPlan);
  saveJson(STORAGE_KEYS.QUIZ_HISTORY, state.quizHistory);
};

const notify = () => {
  persist();
  listeners.forEach((listener) => listener(getState()));
};

export const subscribe = (listener) => {
  listeners.add(listener);
  listener(getState());

  return () => listeners.delete(listener);
};

export const getState = () => structuredClone(state);

export const updateAppState = (patch) => {
  state.app = { ...state.app, ...patch };
  notify();
};

export const addChatMessage = (message) => {
  state.chatLog.push(message);
  if (state.chatLog.length > 80) {
    state.chatLog = state.chatLog.slice(-80);
  }
  notify();
};

export const addStudyTask = (task) => {
  state.studyPlan.unshift(task);
  notify();
};

export const updateStudyTask = (taskId, patch) => {
  state.studyPlan = state.studyPlan.map((task) =>
    task.id === taskId
      ? {
          ...task,
          ...patch
        }
      : task
  );
  notify();
};

export const clearCompletedTasks = () => {
  state.studyPlan = state.studyPlan.filter((task) => !task.completed);
  notify();
};

export const removeStudyTask = (taskId) => {
  state.studyPlan = state.studyPlan.filter((task) => task.id !== taskId);
  notify();
};

export const addQuizResult = (result) => {
  state.quizHistory.unshift(result);
  if (state.quizHistory.length > 120) {
    state.quizHistory = state.quizHistory.slice(0, 120);
  }
  notify();
};

export const recordLessonVisit = (lessonId, subjectId) => {
  const currentCount = state.app.lessonVisitCounts[lessonId] || 0;
  const visits = {
    ...state.app.lessonVisitCounts,
    [lessonId]: currentCount + 1
  };

  const completed = new Set(state.app.completedLessonIds);
  completed.add(lessonId);

  const subjectProgress = {
    ...state.app.subjectProgress,
    [subjectId]: (state.app.subjectProgress[subjectId] || 0) + 1
  };

  state.app = {
    ...state.app,
    completedLessonIds: [...completed],
    lessonVisitCounts: visits,
    subjectProgress,
    totalStudyMinutes: state.app.totalStudyMinutes + 12,
    lastOpenAt: Date.now()
  };

  notify();
};
