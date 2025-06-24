import React from 'react'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../authcontext/AuthContext'

const RootLayout = () => {
  return (
     <AuthProvider>
      <Outlet/>
      </AuthProvider>
  )
}

export default RootLayout