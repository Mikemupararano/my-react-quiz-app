import React, { useState } from 'react';

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswerIdx, setSelectedAnswerIdx] = useState(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);

    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setSelectedAnswerIdx(index);
        const isCorrect = answer === correctAnswer;
        setIsAnswerCorrect(isCorrect);
        setUserAnswers([
            ...userAnswers,
            { question, selectedAnswer: answer, correctAnswer, isCorrect: isCorrect ? 1 : 0 }
        ]);
    };

    const onClickNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswerIdx(null);
            setIsAnswerCorrect(null);
        } else {
            setShowResult(true);
        }
    };

    const retakeQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswerIdx(null);
        setIsAnswerCorrect(null);
        setUserAnswers([]);
        setShowResult(false);
    };

    const downloadCSV = () => {
        const headers = "Question,Selected Answer,Correct Answer,Is Correct\n";
        const rows = userAnswers.map(answer => 
            `${answer.question},${answer.selectedAnswer},${answer.correctAnswer},${answer.isCorrect}`
        ).join("\n");
        const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "quiz_results.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (showResult) {
        const correctAnswersCount = userAnswers.filter(answer => answer.isCorrect === 1).length;
        return (
            <div className='result-container'>
                <h2>Quiz Completed!</h2>
                <p>Your Score: {correctAnswersCount} / {questions.length}</p>
                <button onClick={retakeQuiz}>Retake Quiz</button>
                <button onClick={downloadCSV}>Download Results as CSV</button>
            </div>
        );
    }

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
            <div className='footer'>
                <button onClick={onClickNext} disabled={selectedAnswerIdx === null}>
                    {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
            </div>
            {isAnswerCorrect !== null && (
                <div className={`answer-feedback ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                </div>
            )}
        </div>
    );
};

export default Quiz;
