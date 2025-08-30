import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes,Route, Navigate} from 'react-router-dom'
import Chatbot from './components/Chatbot'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {

  
  const user=localStorage.getItem("user");

  return (
    <div>
    <Routes>
       <Route element={<ProtectedRoute user={user}/>} > 
      <Route path='/' element={<Chatbot /> } />
      
      </Route>

{/*       
      <Route path='/login' element={<ProtectedRoute user={!user} redirect='/'><Login /> </ProtectedRoute>} />
      <Route path='/signup' element={<ProtectedRoute user={!user} redirect='/'><Signup /> </ProtectedRoute>} /> */}
       <Route path='/signup' element={user?<Navigate to={'/'} />:<Signup />} />
        <Route path='/login' element={user?<Navigate to={'/'} />:<Login />} />
    </Routes>
  
  <Toaster />
    </div>
  )
}

export default App
