import { trimAndNormalize } from '../utils/formatters.js';

export const createStudyTask = ({ title, subjectId, lessonId, dueDate }) => {
  const normalized = trimAndNormalize(title);
  return {
    id: `task-${Math.random().toString(36).slice(2, 11)}`,
    title: normalized,
    subjectId,
    lessonId,
    dueDate,
    completed: false,
    createdAt: Date.now(),
    completedAt: null
  };
};

export const shouldAcceptTaskTitle = (title) => trimAndNormalize(title).length >= 3;
