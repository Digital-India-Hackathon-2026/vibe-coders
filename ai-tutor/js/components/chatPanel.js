import { createElement, clearElement, formatDateTime } from '../utils/dom.js';

const renderMessage = (message) => {
  const messageNode = createElement('article', `chat-message ${message.role}`);

  const meta = createElement(
    'p',
    'info-note',
    `${message.role === 'assistant' ? 'Tutor' : 'You'} • ${formatDateTime(message.createdAt)}`
  );
  const content = createElement('p', null, message.text);
  messageNode.append(meta, content);

  return messageNode;
};

export const renderChatPanel = ({ container, chatLog, onSendMessage }) => {
  clearElement(container);

  const shell = createElement('div', 'chat-shell');
  const log = createElement('div', 'chat-log');

  if (!chatLog.length) {
    log.append(createElement('p', 'empty-state', 'Ask a question to start your tutor session.'));
  } else {
    chatLog.forEach((message) => log.append(renderMessage(message)));
  }

  const input = createElement('textarea', 'text-area');
  input.rows = 3;
  input.placeholder = 'Ask about concept clarity, quizzes, debugging, or planning...';

  const sendBtn = createElement('button', 'btn btn-primary', 'Send');
  sendBtn.type = 'button';

  const send = () => {
    const value = input.value.trim();
    if (!value) {
      return;
    }
    onSendMessage(value);
    input.value = '';
  };

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  });

  shell.append(log, input, sendBtn);
  container.append(shell);
};
