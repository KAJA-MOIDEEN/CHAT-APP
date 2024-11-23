import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useLocation } from 'react-router-dom'

const Content = () => {
  const location = useLocation();
  useEffect(()=>{
    console.log(location.pathname);
  },[]);
  return (
    <>
    <div className='flex w-full flex-col'>
    <Navbar/>
    {<Outlet/>}
    </div>
    </>
  )
}

export default Content