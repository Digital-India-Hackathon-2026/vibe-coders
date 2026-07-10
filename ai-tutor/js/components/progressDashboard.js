import { createElement, clearElement, asPercent } from '../utils/dom.js';
import { pluralize } from '../utils/formatters.js';

const metric = (label, value) => {
  const node = createElement('div', 'metric');
  node.append(createElement('p', 'metric-label', label));
  node.append(createElement('p', 'metric-value', value));
  return node;
};

export const renderProgressDashboard = ({ container, stats }) => {
  clearElement(container);

  const grid = createElement('div', 'metric-grid');
  grid.append(metric('Lessons Completed', `${stats.completedInCatalog}/${stats.totalLessons}`));
  grid.append(metric('Completion Rate', asPercent(stats.completionRate)));
  grid.append(metric('Quiz Attempts', String(stats.quizAttempts)));
  grid.append(metric('Average Quiz Score', asPercent(stats.avgQuizScore)));
  grid.append(metric('Passed Quizzes', pluralize(stats.passedQuizCount, 'attempt')));
  grid.append(metric('Study Time', `${stats.totalStudyMinutes} mins`));

  const streak = createElement('p', 'info-note', `Current streak: ${stats.streakDays} day(s).`);

  container.append(grid, streak);
};
