import { Toaster } from 'react-hot-toast'
import './App.css'
import RouterPage from './pages/RoutePage'
import { AuthProvider } from './authcontext/AuthContext'
import { Provider } from 'react-redux'
import { store } from './Redux/store'

function App() {
  
  return (
    <>
    <Provider store={store}>
    <AuthProvider>
    <Toaster position='top-right' reverseOrder={true} />
    <RouterPage/>
    </AuthProvider>
    </Provider>
    </>
  )
}

export default App
