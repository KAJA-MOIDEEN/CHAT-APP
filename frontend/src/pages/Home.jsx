import React from 'react'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'

const Home = () => {
  return (
        <><div className='flex h-screen'>
        <Sidebar/>
        <Content/>
        </div>
       </>
  )
}

export default Home