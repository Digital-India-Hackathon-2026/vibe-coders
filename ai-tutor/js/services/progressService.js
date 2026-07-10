export const calculateProgressStats = (state, lessons) => {
  const totalLessons = lessons.length;
  const completedInCatalog = lessons.filter((lesson) =>
    state.app.completedLessonIds.includes(lesson.id)
  ).length;

  const completionRate = totalLessons ? (completedInCatalog / totalLessons) * 100 : 0;

  const quizAttempts = state.quizHistory.length;
  const avgQuizScore =
    quizAttempts > 0
      ? state.quizHistory.reduce((sum, item) => sum + item.score, 0) / quizAttempts
      : 0;

  const passedQuizCount = state.quizHistory.filter((item) => item.passed).length;

  return {
    totalLessons,
    completedInCatalog,
    completionRate,
    quizAttempts,
    avgQuizScore,
    passedQuizCount,
    streakDays: state.app.streakDays,
    totalStudyMinutes: state.app.totalStudyMinutes
  };
};
