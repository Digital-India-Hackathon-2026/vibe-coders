export const SUBJECTS = [
  {
    id: 'javascript',
    name: 'JavaScript Engineering',
    description: 'Core language skills, browser APIs, and architecture patterns.',
    topicTags: ['fundamentals', 'dom', 'async', 'testing', 'architecture']
  },
  {
    id: 'python',
    name: 'Python Development',
    description: 'Productive scripting, data workflows, and backend building blocks.',
    topicTags: ['fundamentals', 'oop', 'data', 'web', 'automation']
  },
  {
    id: 'web',
    name: 'Web Foundations',
    description: 'HTML/CSS layout systems, accessibility, and responsive design.',
    topicTags: ['html', 'css', 'accessibility', 'responsive', 'performance']
  },
  {
    id: 'algorithms',
    name: 'Algorithms & Data Structures',
    description: 'Problem solving, complexity analysis, and practical coding patterns.',
    topicTags: ['arrays', 'graphs', 'dp', 'search', 'optimization']
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning Basics',
    description: 'Conceptual understanding of models, evaluation, and responsible AI.',
    topicTags: ['ml-basics', 'evaluation', 'prompting', 'ethics', 'deployment']
  },
  {
    id: 'career',
    name: 'Developer Career Skills',
    description: 'Communication, code reviews, debugging workflow, and interview prep.',
    topicTags: ['communication', 'debugging', 'projects', 'interviews', 'collaboration']
  }
];

export const getSubjectById = (subjectId) => SUBJECTS.find((subject) => subject.id === subjectId);
