import { createElement, clearElement } from '../utils/dom.js';

export const renderTopicSelector = ({ container, subjects, selectedSubjectId, selectedTopicTag, onChange }) => {
  clearElement(container);

  const subjectRow = createElement('div', 'selector-row');
  const subjectLabel = createElement('label', null, 'Subject');
  const subjectSelect = createElement('select', 'select-input');
  subjectSelect.name = 'subject';

  subjects.forEach((subject) => {
    const option = createElement('option', null, subject.name);
    option.value = subject.id;
    option.selected = subject.id === selectedSubjectId;
    subjectSelect.append(option);
  });

  subjectRow.append(subjectLabel, subjectSelect);

  const activeSubject = subjects.find((subject) => subject.id === selectedSubjectId) || subjects[0];
  const topicRow = createElement('div', 'selector-row');
  const topicLabel = createElement('label', null, 'Topic focus');
  const topicSelect = createElement('select', 'select-input');
  topicSelect.name = 'topic';

  const allOption = createElement('option', null, 'All topics');
  allOption.value = '';
  allOption.selected = selectedTopicTag === '';
  topicSelect.append(allOption);

  activeSubject.topicTags.forEach((topic) => {
    const option = createElement('option', null, topic);
    option.value = topic;
    option.selected = topic === selectedTopicTag;
    topicSelect.append(option);
  });

  topicRow.append(topicLabel, topicSelect);

  const desc = createElement('p', 'info-note', activeSubject.description);

  subjectSelect.addEventListener('change', () => {
    const nextSubject = subjects.find((subject) => subject.id === subjectSelect.value) || subjects[0];
    onChange({ subjectId: nextSubject.id, topicTag: nextSubject.topicTags[0] || '' });
  });

  topicSelect.addEventListener('change', () => {
    onChange({ subjectId: subjectSelect.value, topicTag: topicSelect.value });
  });

  container.append(subjectRow, topicRow, desc);
};
