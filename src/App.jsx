import React from 'react'; // Ensure the 'R' in 'React' is capitalized
import Quiz from './components/Quiz';
import { jsQuizz } from './components/constants';
import './App.scss';

function App() {
  return (
    <div className="App">
      
        <h1>Hello</h1>
        <Quiz questions={jsQuizz.questions} />
      </div>
   
  );
}

export default App;