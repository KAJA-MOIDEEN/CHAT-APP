import { Toaster } from 'react-hot-toast'
import './App.css'
import RouterPage from './pages/RoutePage'
import { AuthProvider } from './authcontext/AuthContext'

function App() {

  return (
    <>
    <AuthProvider>
    <Toaster position='top-right' reverseOrder={true}/>
    <RouterPage/>
    </AuthProvider>
    </>
  )
}

export default App
