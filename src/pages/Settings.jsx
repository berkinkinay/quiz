import React from 'react'
import { Box } from '@mui/system'
import SelectField from '../components/SelectField'
import { Button, CircularProgress, Typography } from '@mui/material'
import TextFieldComp from '../components/TextFieldComp'
import useAxios from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
//import { createTheme } from '@mui/material/styles';

const Settings = (props) => {
  const { response, error, loading } = useAxios ({ url: '/api_category.php'});
  const navigate = useNavigate();

  if(loading) {
    return (
      <div className='mt-36'>
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
    <form onSubmit={handleSubmit} className='flex flex-col items-center gap-5 w-72 h-24'>
        <SelectField label="Category" options={response.trivia_categories}/>
        <SelectField label="Difficulty" options={difficultyOptions} />
        <SelectField label="Type" options={typeOptions} />
        <div className='ml-2 w-36'> 
          <TextFieldComp /> 
        </div>
        <div className='mt-5'> 
          <button className='bn' onClick={()=>{navigate('/questions')}} fullWidth variant='contained' type='submit'>
              Get Started
          </button>
        </div>
    </form>
  )
}
export default Settings


// 55.33
//useNavigate
/*
const theme = createTheme({
  palette: {
    primary: {
      dark: '#02040a',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});
*/