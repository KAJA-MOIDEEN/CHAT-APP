import React from 'react'
import { Outlet } from 'react-router-dom'

const Navbar = () => {
  return (<>
    <div className='flex justify-between items-center w-full h-16 p-5'>
      <div>profile</div>
      <div>pic</div>
    </div>
    </>
  )
}

export default Navbar