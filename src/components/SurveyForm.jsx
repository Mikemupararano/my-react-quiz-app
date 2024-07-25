import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { initialQuestions, questionTemplate, initialSurveyDescription } from './constants';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import '../index.scss'; // Import your styles

const ItemTypes = {
  QUESTION: 'question',
};

const Question = ({ question, index, moveQuestion, handleInputChange, handleOptionChange, handleRemoveQuestion }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.QUESTION,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveQuestion(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.QUESTION,
    item: { type: ItemTypes.QUESTION, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="question-container">
      {question.type === 'multiple-choice' && (
        <>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            placeholder="Enter question text"
          />
          {question.options.map((option, oIndex) => (
            <div key={oIndex}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
              />
            </div>
          ))}
          <button onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
        </>
      )}
      {question.type === 'number' && (
        <>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            placeholder="Enter question text"
          />
          <input
            type="number"
            value={question.answer}
            onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
            placeholder="Enter number"
          />
          <button onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
        </>
      )}
      {question.type === 'short-text' && (
        <>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            placeholder="Enter question text"
          />
          <input
            type="text"
            value={question.answer}
            onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
            placeholder="Enter short text answer"
          />
          <button onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
        </>
      )}
      {question.type === 'long-text' && (
        <>
          <input
            type="text"
            value={question.question}
            onChange={(e) => handleInputChange(index, 'question', e.target.value)}
            placeholder="Enter question text"
          />
          <textarea
            value={question.answer}
            onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
            placeholder="Enter long text answer"
          />
          <button onClick={() => handleRemoveQuestion(index)}>Remove Question</button>
        </>
      )}
    </div>
  );
};

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

  const moveQuestion = (fromIndex, toIndex) => {
    const updatedQuestions = [...questions];
    const [movedQuestion] = updatedQuestions.splice(fromIndex, 1);
    updatedQuestions.splice(toIndex, 0, movedQuestion);
    setQuestions(updatedQuestions);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="survey-container">
        <textarea
          value={surveyDescription}
          onChange={(e) => setSurveyDescription(e.target.value)}
          placeholder="Enter survey description"
        />
        {questions.map((question, index) => (
          <Question
            key={question.id}
            index={index}
            question={question}
            moveQuestion={moveQuestion}
            handleInputChange={handleInputChange}
            handleOptionChange={handleOptionChange}
            handleRemoveQuestion={handleRemoveQuestion}
          />
        ))}
        <button className="add-question-btn" onClick={handleAddQuestion}>Add Question</button>
        <button className="reset-btn" onClick={handleReset}>Reset</button>
        <button className="submit-btn" onClick={handleSubmit}>Submit & Download CSV</button>
      </div>
    </DndProvider>
  );
};

export default SurveyForm;
