import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes,Route, Navigate} from 'react-router-dom'
import Chatbot from './components/Chatbot'
import { useAuth } from './components/context/AuthProvider'

const App = () => {

  const [authUser,setauthUser]=useAuth();

  return (
    <div>
    <Routes>
       <Route path='/' element={authUser? <Chatbot/> :(<Navigate to={"/login"}/>) } />


       <Route path="/login" element={ authUser ? <Navigate to="/" />:<Login/>} />

       <Route path="/signup" element={authUser ? <Navigate to="/" />:<Signup />} />
    </Routes>
  
    </div>
  )
}

export default App
