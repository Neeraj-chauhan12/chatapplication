import React, { useEffect, useState } from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import {Routes,Route, Navigate} from 'react-router-dom'
import Chatbot from './components/Chatbot'
import {Toaster} from 'react-hot-toast'

const App = () => {

  


  const [user,setUser]=useState(null);

  useEffect(()=>{
    const saved=localStorage.getItem("user")
    if(saved){
      setUser(JSON.parse(saved))
    }
  },[])

  return (
    <div>
    <Routes>
      
      <Route path='/' element={user?<Chatbot />: <Navigate to={'/login'} /> } />
       <Route path='/signup' element={user?<Navigate to={'/'} />:<Signup />} />
        <Route path='/login' element={user?<Navigate to={'/'} />:<Login />} />
    </Routes>
  
  <Toaster />
    </div>
  )
}

export default App
