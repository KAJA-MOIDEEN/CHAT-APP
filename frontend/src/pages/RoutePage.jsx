import React, { useContext, useEffect } from 'react'
import {Routes,Route,} from "react-router-dom"
import Home from './Home'
import Login from './Login'
import NotFoundPage from './NotFoundPage'
import Message from './Message'
import { AuthContext } from '../authcontext/AuthContext'
const RouterPage = () => {
  const {token,navigate} = useContext(AuthContext);

  return (
    <>
    <Routes>
      {<Route path="/" element={<Home />}>
      <Route path='/Message' element={<Message/>}/>
      </Route>}
      <Route path="/login" element={<Login />}/>
      <Route path="/notFoundPage" element={<NotFoundPage />}/>
    </Routes>
    </>
  )
}

export default RouterPage