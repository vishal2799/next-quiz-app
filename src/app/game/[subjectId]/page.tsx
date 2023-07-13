"use client"
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { redirect } from 'next/navigation'
import { useSession } from "next-auth/react"

export default function GameBySubject() {
    const params = useParams();
    const { data: session, status } = useSession()

    // if (!session?.user || status !== "authenticated") {
    //   redirect('/login')
    // }

      const [question, setQuestion] = useState<any | null>(null);
  const [chosenOption, setChosenOption] = useState('');
  const [answerResult, setAnswerResult] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [showLevelScreen, setShowLevelScreen] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/game/question/${params.subjectId}?userId=${session?.user?.id}`);
      console.log('question', response);
      setQuestion(response.data);
      setChosenOption('');
      setAnswerResult(null);
      setLoading(false)
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

    const handleAnswerSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/answer', {
        userId: session?.user?.id, // Replace with the actual user ID
        questionId: question.id,
        chosenOption,
      });

      const isCorrect = response.data.correct;

      setAnswerResult(isCorrect);
      setQuestionCount((prevCount) => prevCount + 1);

      if (questionCount >= 3) {
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
        <div className='flex justify-between items-center'>
            <h1 className='text-3xl font-semibold tracking-tight'>Game {params.subjectId}</h1>
            <Link href='/dashboard/subject/create' className={buttonVariants()}>Welcome</Link>           
        </div>
        <div className="container mx-auto py-10">
        <div>
       {question !== null ? (
        <div>Question Fetched</div>
        // <div>
        //   <h3>{question.description}</h3>
        //   <form onSubmit={handleAnswerSubmit}>
        //     <ul>
        //       {question.options.map((option:any) => (
        //         <li key={option.id}>
        //           <label>
        //             <input
        //               type="radio"
        //               name="option"
        //               value={option.id}
        //               checked={chosenOption === option.id}
        //               onChange={(e) => setChosenOption(e.target.value)}
        //             />
        //             {option.description}
        //           </label>
        //         </li>
        //       ))}
        //     </ul>
        //     <button type="submit">Submit Answer</button>
        //   </form>
        // </div>
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
    </div>
    </div>
    )
}
  