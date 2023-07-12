import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Settings from '../pages/Settings'
import FinalScreen from '../pages/FinalScreen'
import Questions from '../pages/Questions'

const PageRouter = () => {
    const location = useLocation();
  return (
    <>
       <Routes key={location.pathname} location={location}>
            <Route path='/' element={<Settings/>} />
            <Route path='/questions' element={<Questions/>} />
            <Route path='/finalscore' element={<FinalScreen/>} />
        </Routes>
    </>
  )
}

export default PageRouter