import { createElement, clearElement, asPercent } from '../utils/dom.js';

const buildOption = ({ name, option, checked, onChange }) => {
  const wrapper = createElement('label', 'quiz-option');
  const radio = createElement('input');
  radio.type = 'radio';
  radio.name = name;
  radio.value = option;
  radio.checked = checked;

  radio.addEventListener('change', () => onChange(option));

  const text = createElement('span', null, option);
  wrapper.append(radio, text);
  return wrapper;
};

export const renderQuizPanel = ({ container, quiz, answers, result, onAnswerChange, onSubmit }) => {
  clearElement(container);

  if (!quiz) {
    container.append(createElement('p', 'empty-state', 'Generate a quiz from the active lesson to practice.'));
    return;
  }

  const shell = createElement('div', 'quiz-shell');
  shell.append(createElement('p', 'info-note', `${quiz.questions.length} questions ready.`));

  quiz.questions.forEach((question, index) => {
    const card = createElement('article', 'quiz-question');
    card.append(createElement('h3', null, `Q${index + 1}. ${question.prompt}`));

    const options = createElement('div', 'quiz-options');
    question.options.forEach((option) => {
      options.append(
        buildOption({
          name: question.id,
          option,
          checked: answers[question.id] === option,
          onChange: (value) => onAnswerChange(question.id, value)
        })
      );
    });

    card.append(options);
    shell.append(card);
  });

  const submitBtn = createElement('button', 'btn btn-primary', 'Submit Quiz');
  submitBtn.type = 'button';
  submitBtn.addEventListener('click', onSubmit);
  shell.append(submitBtn);

  if (result) {
    const banner = createElement('div', `quiz-result ${result.passed ? 'pass' : 'retry'}`);
    banner.textContent = `Score: ${asPercent(result.score)} (${result.correctCount}/${result.totalQuestions})`;
    shell.append(banner);

    result.details.forEach((detail, index) => {
      const detailItem = createElement('div', 'info-note');
      detailItem.textContent = `${index + 1}. ${detail.isCorrect ? '✅' : '❌'} ${detail.explanation}`;
      shell.append(detailItem);
    });
  }

  container.append(shell);
};
