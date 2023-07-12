import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { handleAmountChange, handleScoreChange } from '../redux/actions'

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
    <div className='flex flex-col items-center justify-center h-56 w-56 gap-10 bg-black rounded-xl mt-20'>
      <h1 className='flex text-base text-white'> 
        Final Score  {score}
      </h1>
      <button className='bn632-hover bn24' onClick={handleBackToSettings} variant='outlined'>
          Back to settings!
      </button>
    </div>
  )
}

export default FinalScreen