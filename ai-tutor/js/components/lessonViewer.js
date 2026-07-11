import { createElement, clearElement, safeHtml } from '../utils/dom.js';

const renderSection = (section) => {
  const sectionNode = createElement('section', 'lesson-section');
  const title = createElement('h3', null, section.title);
  sectionNode.append(title);

  if (section.type === 'list') {
    const list = createElement('ul');
    section.items.forEach((item) => {
      const li = createElement('li');
      li.innerHTML = safeHtml(item);
      list.append(li);
    });
    sectionNode.append(list);
    return sectionNode;
  }

  if (section.type === 'steps') {
    const list = createElement('ol');
    section.items.forEach((item) => {
      const li = createElement('li');
      li.innerHTML = safeHtml(item);
      list.append(li);
    });
    sectionNode.append(list);
    return sectionNode;
  }

  const paragraph = createElement('p');
  paragraph.innerHTML = safeHtml(section.content);
  sectionNode.append(paragraph);

  return sectionNode;
};

export const renderLessonViewer = ({ container, lesson, onMarkComplete }) => {
  clearElement(container);

  if (!lesson) {
    container.append(createElement('p', 'empty-state', 'Select a lesson to begin learning.'));
    return;
  }

  const shell = createElement('div', 'lesson-content');

  const header = createElement('div', 'lesson-card');
  header.append(createElement('h3', null, lesson.title));
  header.append(createElement('p', null, lesson.summary));

  const quickFacts = createElement('div', 'lesson-card-meta');
  quickFacts.append(createElement('span', 'inline-pill', lesson.difficulty));
  quickFacts.append(createElement('span', 'inline-pill', `${lesson.estimatedMinutes} minutes`));
  quickFacts.append(createElement('span', 'inline-pill', lesson.learningGoal));

  const completeBtn = createElement('button', 'btn btn-primary', 'Mark as Studied');
  completeBtn.type = 'button';
  completeBtn.addEventListener('click', () => onMarkComplete(lesson.id, lesson.subjectId));

  header.append(quickFacts, completeBtn);

  shell.append(header);
  lesson.sections.forEach((section) => shell.append(renderSection(section)));

  container.append(shell);
};
