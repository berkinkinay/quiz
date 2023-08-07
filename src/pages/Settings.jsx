import React from 'react'
import { motion } from 'framer-motion'
import SelectField from '../components/SelectField'
import { CircularProgress, Typography } from '@mui/material'
import TextFieldComp from '../components/TextFieldComp'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'

const Settings = (props) => {
  const { response, error, loading } = useAxios ({ url: '/api_category.php'});
  const navigate = useNavigate();

  if(loading) {
    return (
      <div className='lg:mt-80 2xl:mt-0 flex items-center justify-center'>
          <CircularProgress color="secondary" />
      </div>
    )
  }

  if(error) {
    return (
      <div className='flex w-fit h-fit text-xl text-purple-500'>
        <Typography>
           Opss... We got some issues!
        </Typography>
      </div>
    )
  }

  const difficultyOptions = [ 
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ]

  const typeOptions = [ 
    { id: 'multiple', name: 'Multiple Choice'},
    { id: 'boolean', name: 'True/False' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} class='flex flex-col items-center gap-5 2xl:w-96 xs:w-full lg:w-full md:w-full h-auto'>
        <SelectField label="Category" options={response.trivia_categories}/>
        <SelectField label="Difficulty" options={difficultyOptions} />
        <SelectField label="Type" options={typeOptions} />
        <div className='ml-2 w-36'> 
          <TextFieldComp /> 
        </div>
        <div className='mt-5'> 
        <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            whileTap={{ scale: 1 }}
          >
            <button class='bn' onClick={()=>{navigate('/questions')}} fullWidth variant='contained' type='submit'>
                Get Started
            </button>
          </motion.div>
        </div>
    </form>
  )
}
export default Settings;