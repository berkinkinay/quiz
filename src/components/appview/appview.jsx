import React from 'react'
import './styles.css'
import PageRouter from '../PageRouter'

const AppView = () => {
  return (
    <> 
      <div className='app-view'>
        <div className='box'>
          <div
            className='header'
              >
                <a 
                  class='font-extrabold underline decoration-1
                        text-purple-700 text-2xl hover:text-white' 
                  href='/'
                  >
                     Quiz App
                </a>
          </div>
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
