import React, { useState } from 'react';

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswerIdx, setSelectedAnswerIdx] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setSelectedAnswerIdx(index);
        setIsAnswerCorrect(answer === correctAnswer);
    };

    return (
        <div className='quiz-container'>
            <div className='question-info'>
                <span className="active-question-no">{currentQuestion + 1}</span>
                <span className="total-question">/{questions.length}</span>
            </div>
            <h2>{question}</h2>
            <ul className='choices-list'>
                {choices.map((choice, index) => (
                    <li
                        onClick={() => onAnswerClick(choice, index)}
                        key={choice}
                        className={selectedAnswerIdx === index ? 'selected-answer' : ''}
                    >
                        {choice}
                    </li>
                ))}
            </ul>
            {isAnswerCorrect !== null && (
                <div className={`answer-feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                </div>
            )}
        </div>
    );
};

export default Quiz;
