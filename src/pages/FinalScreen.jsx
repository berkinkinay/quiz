import React from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { handleAmountChange, handleScoreChange } from '../redux/actions'
import { BsFillCaretLeftFill } from 'react-icons/bs';
import { motion } from 'framer-motion'

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
        <motion.div
          animate={{ x: 20 }}
          transition={{ ease: "easeOut", duration: 0.6 }}
          class='flex flex-col items-center justify-center mr-16 border-b-2 border-purple-500 drop-shadow-2xl rounded-lg'
        > 
          <h1 class='flex text-base font-bold text-slate-900'> 
            Final Score  {score}
          </h1>
          <text class='flex text-base font-semibold text-slate-700'> 
            Click the button to return to the question settings page, create and start the new test!        
          </text>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            whileTap={{ scale: 1 }}
          >
            <button class='bn632-hover bn24' onClick={handleBackToSettings} variant='outlined'>
                <BsFillCaretLeftFill class='flex w-full items-center hover:text-black' size='1.5rem' />
            </button>
          </motion.div>
        </motion.div>
    </div>
  )
}
export default FinalScreen;