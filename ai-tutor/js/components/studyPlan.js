import { createElement, clearElement, formatDateTime } from '../utils/dom.js';

export const renderStudyPlan = ({
  container,
  tasks,
  subjects,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) => {
  clearElement(container);

  const titleInputRow = createElement('div', 'selector-row');
  const titleInput = createElement('input', 'text-input');
  titleInput.placeholder = 'Add study task (e.g., Complete async JS quiz)';

  const subjectSelect = createElement('select', 'select-input');
  const defaultSubjectOption = createElement('option', null, 'General');
  defaultSubjectOption.value = '';
  subjectSelect.append(defaultSubjectOption);

  subjects.forEach((subject) => {
    const option = createElement('option', null, subject.name);
    option.value = subject.id;
    subjectSelect.append(option);
  });

  const dueDateInput = createElement('input', 'text-input');
  dueDateInput.type = 'date';

  const addBtn = createElement('button', 'btn btn-primary', 'Add Task');
  addBtn.type = 'button';

  addBtn.addEventListener('click', () => {
    onAddTask({
      title: titleInput.value,
      subjectId: subjectSelect.value,
      dueDate: dueDateInput.value || null
    });

    titleInput.value = '';
    dueDateInput.value = '';
  });

  titleInputRow.append(titleInput, subjectSelect, dueDateInput, addBtn);
  container.append(titleInputRow);

  if (!tasks.length) {
    container.append(createElement('p', 'empty-state', 'No study tasks yet. Add one to stay consistent.'));
    return;
  }

  const list = createElement('ul', 'study-plan-list');

  tasks.forEach((task) => {
    const item = createElement('li', `study-item ${task.completed ? 'completed' : ''}`);

    const check = createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed;
    check.addEventListener('change', () => onToggleTask(task.id, check.checked));

    const body = createElement('div');
    const subjectName = subjects.find((subject) => subject.id === task.subjectId)?.name || 'General';
    const title = createElement('p', 'study-item-title', task.title);
    const meta = createElement(
      'p',
      'study-item-meta',
      `${subjectName} • due ${task.dueDate || 'unscheduled'} • created ${formatDateTime(task.createdAt)}`
    );
    body.append(title, meta);

    const deleteBtn = createElement('button', 'btn btn-secondary', 'Delete');
    deleteBtn.type = 'button';
    deleteBtn.addEventListener('click', () => onDeleteTask(task.id));

    item.append(check, body, deleteBtn);
    list.append(item);
  });

  container.append(list);
};
