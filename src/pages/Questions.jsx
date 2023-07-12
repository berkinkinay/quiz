import React, {useEffect, useState } from 'react'
import { decode } from "html-entities";
import { useNavigate } from 'react-router'
import { CircularProgress } from '@mui/material'
import { Box } from '@mui/system'
import useAxios from '../hooks/useAxios'
import { useSelector, useDispatch } from 'react-redux'
import { handleScoreChange } from '../redux/actions'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const Questions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    question_category,
    question_difficulty,
    question_type,
    amount_of_question,
    score,
  } = useSelector( state => state );

  let apiUrl = `/api.php?amount=${amount_of_question}`;
  if (question_category) {
    apiUrl = apiUrl.concat(`&category=${question_category}`);
  }
  if (question_difficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
  }
  if (question_type) {
    apiUrl = apiUrl.concat(`&type=${question_type}`);
  }

  const { response, loading } = useAxios({ url: apiUrl });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.results.length) {
      const question = response.results[questionIndex];
      let answers = [...question.incorrect_answers];
      answers.splice(
        getRandomInt(question.incorrect_answers.length),
        0,
        question.correct_answer
      );
      setOptions(answers);
    }
  }, [response, questionIndex]);

  if(loading) {
    return(
      <Box mt={20}>
          <CircularProgress color="secondary" />
      </Box>
    )
  };

  const handleClickAnswer = (e) => {
    const question = response.results[questionIndex] 
    if(e.target.textContent === question.correct_answer) {
      dispatch(handleScoreChange(score + 1 ))
    }
    
    if(questionIndex + 1 < response.results.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      navigate('/finalscore');
    }
  };

  return (
    <div className='flex bg-slate-800 drop-shadow-2xl m-5 p-10 rounded-lg gap-4 flex-col w-[600px] h-fit items-center text-white'>
      <Box>
        <div className='flex items-center justify-center w-full h-fit text-2xl'>Questions {questionIndex + 1}</div>
        <div className='flex items-center justify-center w-full h-16 text-base text-slate-300 text-center'>
          {decode(response.results[questionIndex].question)}
        </div>
        <div className='flex flex-col-1 gap-5 w-full h-fit items-center justify-center'>
          {options.map((data, id) => (
            <div className='flex mt-5 flex-col text-base text-center
                            items-center justify-center'  key={id}>
              <button 
                className='Button' 
                onClick={handleClickAnswer}
                >
                {decode(data)}
              </button>
            </div>
          ))}
         </div>
        <div className='flex items-center justify-center text-base mt-4'>
          Score: {score} / {response.results.length}
        </div>
      </Box>
    </div>

  )
}
export default Questions;

// 1.10:32