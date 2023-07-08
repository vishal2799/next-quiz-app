"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react'

export default function QuizPage() {
    const { data: session } = useSession()

  const [question, setQuestion] = useState(null);
  const [chosenOption, setChosenOption] = useState('');
  const [answerResult, setAnswerResult] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [showLevelScreen, setShowLevelScreen] = useState(false);
  const [isPass, setIsPass] = useState(false);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`/api/question?userId=1`); // Replace with the actual user ID

      setQuestion(response.data);
      setChosenOption('');
      setAnswerResult(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/answer', {
        userId: 1, // Replace with the actual user ID
        questionId: question.id,
        chosenOption,
      });

      const isCorrect = response.data.correct;

      setAnswerResult(isCorrect);
      setQuestionCount((prevCount) => prevCount + 1);

      if (questionCount >= 9) {
        setShowLevelScreen(true);
        setIsPass(true); // Replace with your condition to determine pass/fail
      } else {
        setTimeout(() => {
          fetchQuestion();
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLevelScreenDismiss = () => {
    setShowLevelScreen(false);
    setQuestionCount(0);
    fetchQuestion();
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div>
      {question ? (
        <div>
          <h3>{question.description}</h3>
          <form onSubmit={handleAnswerSubmit}>
            <ul>
              {question.options.map((option) => (
                <li key={option.id}>
                  <label>
                    <input
                      type="radio"
                      name="option"
                      value={option.id}
                      checked={chosenOption === option.id}
                      onChange={(e) => setChosenOption(Number(e.target.value))}
                    />
                    {option.description}
                  </label>
                </li>
              ))}
            </ul>
            <button type="submit">Submit Answer</button>
          </form>
        </div>
      ) : (
        <p>Loading question...</p>
      )}

      {answerResult !== null && (
        <div>
          {answerResult ? (
            <p>Correct answer!</p>
          ) : (
            <p>Wrong answer. Try again!</p>
          )}
        </div>
      )}

      {showLevelScreen && (
        <div>
          {isPass ? (
            <p>Level Passed!</p>
          ) : (
            <p>Level Failed!</p>
          )}
          <button onClick={handleLevelScreenDismiss}>Continue</button>
        </div>
      )}
    </div>
  );
}
