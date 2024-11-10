import React, { useContext } from 'react'
import { AuthContext } from '../authcontext/AuthContext'

const NotFoundPage = () => {
  const {navigate} = useContext(AuthContext)
  return (
    <div onClick={()=>navigate("/")}>NotFoundPage</div>
  )
}

export default NotFoundPage