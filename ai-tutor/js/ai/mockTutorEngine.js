const guidancePrompts = {
  fundamentals: [
    'Break the concept into a tiny example and explain each line.',
    'Contrast what changes when input size grows from 10 to 10,000.',
    'Relate this to a bug you recently fixed or saw in a project.'
  ],
  architecture: [
    'Name one boundary that should be stable and one that can evolve.',
    'List tradeoffs and pick one with a reason tied to user impact.',
    'Describe what you would monitor in production for this choice.'
  ],
  testing: [
    'Write the behavior first, then identify the smallest repeatable test.',
    'Identify one edge case and one failure mode before coding.',
    'Use assertions that describe intent, not implementation details.'
  ],
  default: [
    'Rephrase the question in your own words and state the expected outcome.',
    'Try a miniature example and verify assumptions step by step.',
    'Capture one insight in your study plan so it sticks long term.'
  ]
};

const extractIntent = (message) => {
  const normalized = message.toLowerCase();

  if (/bug|error|fail|debug/.test(normalized)) {
    return 'debugging';
  }
  if (/quiz|practice|question/.test(normalized)) {
    return 'quiz';
  }
  if (/plan|schedule|routine/.test(normalized)) {
    return 'planning';
  }
  if (/explain|understand|what is|how does/.test(normalized)) {
    return 'explanation';
  }

  return 'general';
};

const buildIntentReply = ({ intent, subjectName, topicTag, progressHint }) => {
  const prompts = guidancePrompts[topicTag] || guidancePrompts.default;
  const recommendation = prompts[Math.floor(Math.random() * prompts.length)];

  if (intent === 'debugging') {
    return [
      `Great debugging question for ${subjectName}.`,
      'Start with a failing scenario and capture the smallest reproducible input.',
      'Then inspect assumptions at each boundary: input parsing, transformation, and output rendering.',
      recommendation,
      progressHint
    ].join(' ');
  }

  if (intent === 'quiz') {
    return [
      `Nice! Practice accelerates retention in ${subjectName}.`,
      'Open the Quiz Lab and generate a set from the current lesson.',
      'After each question, write a one-line reason for why the correct answer works.',
      recommendation,
      progressHint
    ].join(' ');
  }

  if (intent === 'planning') {
    return [
      `Let us create a focused plan for ${subjectName}.`,
      'Choose one foundational lesson, one applied lesson, and one quiz block.',
      'Schedule them across short sessions (25-35 minutes) with a quick reflection at the end.',
      recommendation,
      progressHint
    ].join(' ');
  }

  if (intent === 'explanation') {
    return [
      `Happy to explain this ${subjectName} topic.`,
      'I suggest: concept definition → tiny worked example → edge-case checklist.',
      'When you finish, summarize the concept aloud using your own words.',
      recommendation,
      progressHint
    ].join(' ');
  }

  return [
    `That is a useful ${subjectName} learning prompt.`,
    'Anchor your study in one lesson objective, then apply it in code immediately.',
    recommendation,
    progressHint
  ].join(' ');
};

export const generateTutorReply = ({ message, subjectName, topicTag, progress }) => {
  const intent = extractIntent(message);
  const completion = progress?.completionRate ? Math.round(progress.completionRate) : 0;
  const quizAverage = progress?.avgQuizScore ? Math.round(progress.avgQuizScore) : 0;

  const progressHint =
    completion > 0
      ? `Current completion is ${completion}% with average quiz score ${quizAverage}%. Keep building on that momentum.`
      : 'You are just getting started—pick one lesson now and complete a short quiz to establish momentum.';

  return buildIntentReply({
    intent,
    subjectName,
    topicTag,
    progressHint
  });
};
