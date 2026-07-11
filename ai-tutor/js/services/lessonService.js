import { LESSON_LIBRARY } from '../data/lessons.js';

export const getLessonsBySubject = (subjectId) =>
  LESSON_LIBRARY.filter((lesson) => lesson.subjectId === subjectId);

export const getLessonsBySubjectAndTopic = (subjectId, topicTag) =>
  LESSON_LIBRARY.filter(
    (lesson) => lesson.subjectId === subjectId && (!topicTag || lesson.topicTags.includes(topicTag))
  );

export const getLessonById = (lessonId) => LESSON_LIBRARY.find((lesson) => lesson.id === lessonId);
