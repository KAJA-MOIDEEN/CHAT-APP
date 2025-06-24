
import { RouterProvider } from 'react-router-dom'
import './App.css'
import Router from './Router'
import { Toaster } from 'react-hot-toast'
function App() {
  
  return (
    <>
    <Toaster position='top-right' reverseOrder={true}/>
    <RouterProvider router={Router} />
    </>
  )
}

export default App
