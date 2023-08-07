import React, {useEffect, useState } from 'react'
import { decode } from "html-entities";
import { useNavigate } from 'react-router'
import { CircularProgress } from '@mui/material'
import useAxios from '../hooks/useAxios'
import { useSelector, useDispatch } from 'react-redux'
import { handleScoreChange } from '../redux/actions'
import { motion } from "framer-motion";

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
      <div class='lg:mt-80 2xl:mt-0 flex items-center justify-center'>
          <CircularProgress color="secondary" />
      </div>
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

  const container = {
    hidden: { opacity: 1, scale: 0.9 },
    visible: {
      opacity: 1.5,
      scale: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div class='flex h-full items-center justify-center'>
      <div class='flex p-10 rounded-lg w-full h-[500px] items-center justify-center'>
        <div class='flex flex-col items-center justify-center w-full h-auto gap-5'>
            <div class='flex items-center justify-center w-full h-fit text-2xl text-gray-800'>Question {questionIndex + 1}</div>
            <div class='flex items-center justify-center w-full h-56 2xl:text-xl text-gray-700 text-center'>
              {decode(response.results[questionIndex].question)}
            </div>
            <div class='grid grid-cols-2 text-center gap-5 w-full h-full items-center justify-center'>
              {options.map((data, id) => (
                <div class='flex w-full h-full flex-cols-2 text-base text-center
                            items-center justify-center'  
                     key={id}
                >
                 <motion.ul
                    className='container'
                    variant={container}
                    initial='hidden'
                    animate='visible'
                 > 
                  {[0].map((index) => (
                          <motion.li key={index} className="item" variants={item}> 
                    <button 
                      class='flex flex-row w-full h-auto text-center items-center justify-center bg-purple-500 hover:bg-white text-white
                            hover:text-black rounded-xl hover:delay-100' 
                      onClick={handleClickAnswer}
                      >
                            {decode(data)}
            
                    </button>
                    </motion.li>
                        ))} 
                </motion.ul>
                </div>
              ))}
            </div>
            <div class='flex items-center justify-center text-base mt-4'>
              Score: {score} / {response.results.length}
            </div>
        </div>
      </div>
    </div>
  )
}
export default Questions;
