export const getById = (id) => document.getElementById(id);

export const createElement = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (typeof text === 'string') {
    element.textContent = text;
  }
  return element;
};

export const clearElement = (node) => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
};

export const asPercent = (value) => `${Math.max(0, Math.min(100, Math.round(value)))}%`;

export const formatDateTime = (timestamp) => {
  if (!timestamp) {
    return 'n/a';
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'n/a';
  }

  return date.toLocaleString();
};

export const safeHtml = (text = '') =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
