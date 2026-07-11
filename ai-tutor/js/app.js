import { SUBJECTS, getSubjectById } from './data/subjects.js';
import { LESSON_LIBRARY } from './data/lessons.js';
import { calculateProgressStats } from './services/progressService.js';
import { getLessonsBySubjectAndTopic, getLessonById, getLessonsBySubject } from './services/lessonService.js';
import { generateQuizFromLesson, evaluateQuiz } from './services/quizService.js';
import { shouldAcceptTaskTitle, createStudyTask } from './services/studyPlanService.js';
import { generateTutorReply } from './ai/mockTutorEngine.js';
import {
  subscribe,
  updateAppState,
  addChatMessage,
  addStudyTask,
  updateStudyTask,
  clearCompletedTasks,
  removeStudyTask,
  addQuizResult,
  recordLessonVisit,
  getState
} from './state/store.js';
import { getById, clearElement, createElement } from './utils/dom.js';
import { renderTopicSelector } from './components/topicSelector.js';
import { renderLessonCards } from './components/lessonCards.js';
import { renderLessonViewer } from './components/lessonViewer.js';
import { renderQuizPanel } from './components/quizPanel.js';
import { renderChatPanel } from './components/chatPanel.js';
import { renderProgressDashboard } from './components/progressDashboard.js';
import { renderStudyPlan } from './components/studyPlan.js';

const ui = {
  topicSelector: getById('topic-selector'),
  lessonCards: getById('lesson-cards'),
  lessonViewer: getById('lesson-viewer'),
  quizPanel: getById('quiz-panel'),
  chatPanel: getById('chat-panel'),
  progressDashboard: getById('progress-dashboard'),
  studyPlan: getById('study-plan'),
  headerMeta: getById('header-meta')
};

const transient = {
  activeQuiz: null,
  quizAnswers: {},
  quizResult: null
};

const ensureActiveLesson = (state, filteredLessons) => {
  if (!filteredLessons.length) {
    return null;
  }

  if (state.app.activeLessonId) {
    const hasActive = filteredLessons.some((lesson) => lesson.id === state.app.activeLessonId);
    if (hasActive) {
      return state.app.activeLessonId;
    }
  }

  return filteredLessons[0].id;
};

const renderHeaderMeta = (state, stats) => {
  clearElement(ui.headerMeta);

  const chips = [
    `Catalog lessons: ${LESSON_LIBRARY.length}`,
    `Completed: ${stats.completedInCatalog}`,
    `Quiz avg: ${Math.round(stats.avgQuizScore)}%`,
    `Study time: ${stats.totalStudyMinutes} min`
  ];

  chips.forEach((text) => ui.headerMeta.append(createElement('span', 'stat-chip', text)));
};

const renderAll = (state) => {
  const filteredLessons = getLessonsBySubjectAndTopic(
    state.app.selectedSubjectId,
    state.app.selectedTopicTag
  );

  const activeLessonId = ensureActiveLesson(state, filteredLessons);
  if (activeLessonId !== state.app.activeLessonId) {
    updateAppState({ activeLessonId });
    return;
  }

  const activeLesson = getLessonById(activeLessonId);
  const catalogLessons = getLessonsBySubject(state.app.selectedSubjectId);
  const stats = calculateProgressStats(state, catalogLessons);

  renderTopicSelector({
    container: ui.topicSelector,
    subjects: SUBJECTS,
    selectedSubjectId: state.app.selectedSubjectId,
    selectedTopicTag: state.app.selectedTopicTag,
    onChange: ({ subjectId, topicTag }) => {
      updateAppState({
        selectedSubjectId: subjectId,
        selectedTopicTag: topicTag,
        activeLessonId: null
      });
      transient.activeQuiz = null;
      transient.quizAnswers = {};
      transient.quizResult = null;
    }
  });

  renderLessonCards({
    container: ui.lessonCards,
    lessons: filteredLessons,
    activeLessonId,
    completedLessonIds: state.app.completedLessonIds,
    onOpenLesson: (lessonId) => updateAppState({ activeLessonId: lessonId }),
    onPlanLesson: (lesson) => {
      addStudyTask(
        createStudyTask({
          title: `Review lesson: ${lesson.title}`,
          subjectId: lesson.subjectId,
          lessonId: lesson.id,
          dueDate: null
        })
      );
    }
  });

  renderLessonViewer({
    container: ui.lessonViewer,
    lesson: activeLesson,
    onMarkComplete: (lessonId, subjectId) => recordLessonVisit(lessonId, subjectId)
  });

  renderQuizPanel({
    container: ui.quizPanel,
    quiz: transient.activeQuiz,
    answers: transient.quizAnswers,
    result: transient.quizResult,
    onAnswerChange: (questionId, answer) => {
      transient.quizAnswers = {
        ...transient.quizAnswers,
        [questionId]: answer
      };
    },
    onSubmit: () => {
      if (!transient.activeQuiz) {
        return;
      }

      const result = evaluateQuiz(transient.activeQuiz, transient.quizAnswers);
      transient.quizResult = result;
      addQuizResult(result);
    }
  });

  renderChatPanel({
    container: ui.chatPanel,
    chatLog: state.chatLog,
    onSendMessage: (message) => {
      addChatMessage({
        id: `user-${Date.now()}`,
        role: 'user',
        text: message,
        createdAt: Date.now()
      });

      const subjectName = getSubjectById(state.app.selectedSubjectId)?.name || 'current subject';
      const reply = generateTutorReply({
        message,
        subjectName,
        topicTag: state.app.selectedTopicTag,
        progress: stats
      });

      addChatMessage({
        id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: 'assistant',
        text: reply,
        createdAt: Date.now()
      });
    }
  });

  renderProgressDashboard({
    container: ui.progressDashboard,
    stats
  });

  renderStudyPlan({
    container: ui.studyPlan,
    tasks: state.studyPlan,
    subjects: SUBJECTS,
    onAddTask: ({ title, subjectId, dueDate }) => {
      if (!shouldAcceptTaskTitle(title)) {
        return;
      }

      addStudyTask(
        createStudyTask({
          title,
          subjectId,
          lessonId: state.app.activeLessonId,
          dueDate
        })
      );
    },
    onToggleTask: (taskId, completed) =>
      updateStudyTask(taskId, {
        completed,
        completedAt: completed ? Date.now() : null
      }),
    onDeleteTask: (taskId) => removeStudyTask(taskId)
  });

  renderHeaderMeta(state, stats);
};

export const initializeApp = () => {
  const state = getState();
  if (!state.app.activeLessonId) {
    const initialLessons = getLessonsBySubjectAndTopic(
      state.app.selectedSubjectId,
      state.app.selectedTopicTag
    );
    if (initialLessons.length) {
      updateAppState({ activeLessonId: initialLessons[0].id });
    }
  }

  getById('refresh-lessons-btn').addEventListener('click', () => {
    renderAll(getState());
  });

  getById('new-quiz-btn').addEventListener('click', () => {
    const current = getState();
    const lesson = getLessonById(current.app.activeLessonId);
    if (!lesson) {
      return;
    }

    transient.activeQuiz = generateQuizFromLesson(lesson);
    transient.quizAnswers = {};
    transient.quizResult = null;
    renderAll(getState());
  });

  getById('clear-study-plan-btn').addEventListener('click', () => clearCompletedTasks());

  subscribe(renderAll);
};
