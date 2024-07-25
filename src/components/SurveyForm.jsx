// src/SurveyForm.jsx
import React, { useState } from 'react';
import { initialQuestions, questionTemplate, initialSurveyDescription } from './constants';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

const SurveyForm = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [surveyDescription, setSurveyDescription] = useState(initialSurveyDescription);

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = { ...questionTemplate, id: questions.length + 1 };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleReset = () => {
    setQuestions(initialQuestions);
    setSurveyDescription(initialSurveyDescription);
  };

  const handleSubmit = () => {
    const csvData = Papa.unparse(questions.map(({ options, ...rest }) => ({
      ...rest,
      options: options.join('; ')
    })));
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'survey_responses.csv');
  };

  const renderQuestion = (question, qIndex) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div key={question.id} className="question-container">
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleInputChange(qIndex, 'question', e.target.value)}
              placeholder="Enter question text"
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex}>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  placeholder={`Option ${oIndex + 1}`}
                />
              </div>
            ))}
            <button onClick={() => handleRemoveQuestion(qIndex)}>Remove Question</button>
          </div>
        );
      case 'number':
        return (
          <div key={question.id} className="question-container">
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleInputChange(qIndex, 'question', e.target.value)}
              placeholder="Enter question text"
            />
            <input
              type="number"
              value={question.answer}
              onChange={(e) => handleInputChange(qIndex, 'answer', e.target.value)}
              placeholder="Enter number"
            />
            <button onClick={() => handleRemoveQuestion(qIndex)}>Remove Question</button>
          </div>
        );
      case 'short-text':
        return (
          <div key={question.id} className="question-container">
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleInputChange(qIndex, 'question', e.target.value)}
              placeholder="Enter question text"
            />
            <input
              type="text"
              value={question.answer}
              onChange={(e) => handleInputChange(qIndex, 'answer', e.target.value)}
              placeholder="Enter short text answer"
            />
            <button onClick={() => handleRemoveQuestion(qIndex)}>Remove Question</button>
          </div>
        );
      case 'long-text':
        return (
          <div key={question.id} className="question-container">
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleInputChange(qIndex, 'question', e.target.value)}
              placeholder="Enter question text"
            />
            <textarea
              value={question.answer}
              onChange={(e) => handleInputChange(qIndex, 'answer', e.target.value)}
              placeholder="Enter long text answer"
            />
            <button onClick={() => handleRemoveQuestion(qIndex)}>Remove Question</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="survey-container">
      <textarea
        value={surveyDescription}
        onChange={(e) => setSurveyDescription(e.target.value)}
        placeholder="Enter survey description"
      />
      {questions.map((question, qIndex) => renderQuestion(question, qIndex))}
      <button className="add-question-btn" onClick={handleAddQuestion}>Add Question</button>
      <button className="reset-btn" onClick={handleReset}>Reset</button>
      <button className="submit-btn" onClick={handleSubmit}>Submit & Download CSV</button>
    </div>
  );
};

export default SurveyForm;
