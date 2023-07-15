import React from 'react'
import './styles.css'
import PageRouter from '../PageRouter'
import { Typewriter } from 'react-simple-typewriter'

const AppView = () => {
  return (
    <> 
      <div className='app-view'>
        <div className='box'>
          <div className='header'>Quiz App</div>
            <div className='body'>
              <h1 className='title'>
               
              </h1>
              <PageRouter />
            </div>
          <div className='footer'>
            <a 
              rel='noreferrer'
              target='_blank'
              className='flex w-fit h-fit hover:text-purple-300' 
              href='https://github.com/berkinkinay'> coded by Berkin Kınay </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default AppView;
