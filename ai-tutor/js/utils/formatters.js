export const pluralize = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;

export const summarizeTags = (tags = []) => {
  if (!tags.length) {
    return 'No tags';
  }

  if (tags.length <= 3) {
    return tags.join(' • ');
  }

  return `${tags.slice(0, 3).join(' • ')} • +${tags.length - 3}`;
};

export const trimAndNormalize = (value) => value.trim().replace(/\s+/g, ' ');
