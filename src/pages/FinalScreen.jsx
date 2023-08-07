import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { handleAmountChange, handleScoreChange } from '../redux/actions'
import { BsFillCaretLeftFill } from 'react-icons/bs';

const FinalScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {score} = useSelector(state => state );

  const handleBackToSettings = () => {
    dispatch(handleScoreChange(0));
    dispatch(handleAmountChange(50));
    navigate('/')
  };
  return (
    <div class='flex flex-col items-center justify-center h-full w-full gap-10 p-10 rounded-xl'>
      <div class='flex flex-col items-center justify-center'>
        <h1 class='flex text-base font-bold text-slate-900'> 
          Final Score  {score}
        </h1>
        <text class='flex text-base font-semibold text-slate-700'> 
          Click the button to return to the question settings page, create and start the new test!        
        </text>
        <button class='bn632-hover bn24' onClick={handleBackToSettings} variant='outlined'>
            <BsFillCaretLeftFill class='flex w-full items-center hover:text-black' size='1.5rem' />
        </button>
      </div>
    </div>
  )
}

export default FinalScreen;
