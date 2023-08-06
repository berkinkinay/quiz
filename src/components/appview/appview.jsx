import React from 'react'
import './styles.css'
import PageRouter from '../PageRouter'

const AppView = () => {
  return (
    <> 
      <div className='app-view'>
        <div className='box'>
          <a 
            className='header'
            href='/'
              >
                Quiz App
          </a>
            <div className='body'>
              <PageRouter />
            </div>
          <div className='footer'>
            <a 
              rel='noreferrer'
              target='_blank'
              className='flex w-fit h-fit hover:text-purple-300' 
              href='https://berkinkinay.dev/'> coded by Berkin Kınay </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default AppView;
