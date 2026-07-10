import { QUIZ_SETTINGS } from '../utils/constants.js';

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const generateQuizFromLesson = (lesson) => {
  const bank = lesson?.quizBank || [];
  const randomized = shuffle(bank);
  const sliceSize = Math.max(
    QUIZ_SETTINGS.MIN_QUESTIONS,
    Math.min(QUIZ_SETTINGS.MAX_QUESTIONS, randomized.length)
  );

  const questions = randomized.slice(0, sliceSize).map((question) => ({
    ...question,
    options: shuffle(question.options)
  }));

  return {
    id: `${lesson.id}-quiz-${Date.now()}`,
    lessonId: lesson.id,
    subjectId: lesson.subjectId,
    title: `${lesson.title} • Practice Quiz`,
    generatedAt: Date.now(),
    questions
  };
};

export const evaluateQuiz = (quiz, answers) => {
  const details = quiz.questions.map((question) => {
    const selected = answers[question.id];
    const isCorrect = selected === question.correctAnswer;

    return {
      questionId: question.id,
      selected,
      correctAnswer: question.correctAnswer,
      isCorrect,
      explanation: question.explanation
    };
  });

  const correctCount = details.filter((item) => item.isCorrect).length;
  const score = quiz.questions.length ? (correctCount / quiz.questions.length) * 100 : 0;

  return {
    quizId: quiz.id,
    lessonId: quiz.lessonId,
    subjectId: quiz.subjectId,
    score,
    correctCount,
    totalQuestions: quiz.questions.length,
    completedAt: Date.now(),
    details,
    passed: score >= QUIZ_SETTINGS.PASS_SCORE
  };
};
