import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Content = () => {
  return (
    <>
    <div className='flex w-full flex-col'>
    <Navbar/>
    <Outlet/>
    </div>
    </>
  )
}

export default Content