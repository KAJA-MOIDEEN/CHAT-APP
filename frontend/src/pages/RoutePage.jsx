import React from 'react'
import {Routes,Route,} from "react-router-dom"
import Home from './Home'
import Login from './Login'
import NotFoundPage from './NotFoundPage'
import Message from './Message'
import Profile from './Profile'
import VerifyEmail from './VerifyPage'

const RouterPage = () => {
  return (
    <>
    <Routes>
      {<Route path="/" element={<Home />}>
      <Route path='/' element={<Profile />}/>
      <Route path='/Message' element={<Message />}/>
      </Route>}
      <Route path="/login" element={<Login />}/>
      <Route path="/notFoundPage" element={<NotFoundPage />}/>
      <Route path="*" element={<NotFoundPage/>} />
      <Route path='/:id/verify/:token' element={<VerifyEmail/>}/>
    </Routes>
    </>
  )
}

export default RouterPage