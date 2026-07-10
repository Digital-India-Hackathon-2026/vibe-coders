export const STORAGE_KEYS = {
  APP_STATE: 'aiTutor.appState.v1',
  CHAT_LOG: 'aiTutor.chatLog.v1',
  STUDY_PLAN: 'aiTutor.studyPlan.v1',
  QUIZ_HISTORY: 'aiTutor.quizHistory.v1'
};

export const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const QUIZ_SETTINGS = {
  MAX_QUESTIONS: 6,
  PASS_SCORE: 70,
  MIN_QUESTIONS: 4
};

export const DEFAULT_APP_STATE = {
  selectedSubjectId: 'javascript',
  selectedTopicTag: 'fundamentals',
  activeLessonId: null,
  completedLessonIds: [],
  lessonVisitCounts: {},
  subjectProgress: {},
  streakDays: 1,
  totalStudyMinutes: 0,
  lastOpenAt: null
};
