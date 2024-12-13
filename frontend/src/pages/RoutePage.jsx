import React from 'react'
import {Routes,Route,} from "react-router-dom"
import Home from './Home'
import Login from './Login'
import NotFoundPage from './NotFoundPage'
import VerifyEmail from './VerifyPage'
import Chat from './Chat'
import HomePage from './Profile'
import Settings from './Settings'

const RouterPage = () => {
  return (
    <>
    <Routes>
      {<Route path="/" element={<Home />}>
      <Route path='/' element={<HomePage />}/>
      <Route path='/Message' element={<Chat />}/>
      <Route path='/settings' element={<Settings/>} />
      <Route path='/wishlist' element={<Settings/>} />
      </Route>}
      <Route path="/login" element={<Login />}/>
      <Route path="/notFoundPage" element={<NotFoundPage />}/>
      <Route path="*" element={<NotFoundPage/>} />
      <Route path='/:id/verify/:token/:email' element={<VerifyEmail/>}/>
    </Routes>
    </>
  )
}

export default RouterPage