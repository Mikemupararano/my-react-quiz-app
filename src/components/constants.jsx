// src/constants.jsx
export const initialSurveyDescription = 'This survey aims to gather feedback from various vendors about their preferences and experiences with our brand. Your responses will help us improve our products and services.';

export const initialQuestions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'What is your favorite color?',
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    answer: ''
  },
  {
    id: 2,
    type: 'number',
    question: 'How many products do you use per month?',
    answer: ''
  },
  {
    id: 3,
    type: 'short-text',
    question: 'What is your preferred brand?',
    answer: ''
  },
  {
    id: 4,
    type: 'long-text',
    question: 'Please describe your experience with our service.',
    answer: ''
  }
];

export const questionTemplate = {
  id: null,
  type: 'multiple-choice',
  question: '',
  options: ['', '', '', ''],
  answer: ''
};
