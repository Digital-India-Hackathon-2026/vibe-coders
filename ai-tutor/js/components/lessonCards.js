import { createElement, clearElement } from '../utils/dom.js';
import { summarizeTags } from '../utils/formatters.js';

export const renderLessonCards = ({ container, lessons, activeLessonId, completedLessonIds, onOpenLesson, onPlanLesson }) => {
  clearElement(container);

  if (!lessons.length) {
    container.append(createElement('p', 'empty-state', 'No lessons found for this filter.'));
    return;
  }

  const grid = createElement('div', 'lesson-card-grid');

  lessons.forEach((lesson) => {
    const card = createElement('article', 'lesson-card');
    const title = createElement('h3', null, lesson.title);
    const summary = createElement('p', null, lesson.summary);

    const meta = createElement('div', 'lesson-card-meta');
    meta.append(createElement('span', 'inline-pill', lesson.difficulty));
    meta.append(createElement('span', 'inline-pill', `${lesson.estimatedMinutes} min`));
    meta.append(createElement('span', 'inline-pill', summarizeTags(lesson.topicTags)));

    if (completedLessonIds.includes(lesson.id)) {
      meta.append(createElement('span', 'badge badge-complete', 'Completed'));
    }

    if (lesson.id === activeLessonId) {
      meta.append(createElement('span', 'badge badge-progress', 'Open'));
    }

    const actions = createElement('div', 'lesson-actions');
    const openBtn = createElement('button', 'btn btn-primary', 'Open Lesson');
    openBtn.type = 'button';
    openBtn.addEventListener('click', () => onOpenLesson(lesson.id));

    const planBtn = createElement('button', 'btn btn-secondary', 'Add to Plan');
    planBtn.type = 'button';
    planBtn.addEventListener('click', () => onPlanLesson(lesson));

    actions.append(openBtn, planBtn);
    card.append(title, summary, meta, actions);
    grid.append(card);
  });

  container.append(grid);
};
