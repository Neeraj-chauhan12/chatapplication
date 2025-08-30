import React from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { BACKEND_URL } from '../utils/Util';
import toast from 'react-hot-toast';

const Login = () => {
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const navigate=useNavigate();
    
    async function onSubmit(data){
      
      const userData={
          email:data.email,
          password:data.password
        }
  
      try {   
     const response= await axios.post(`${BACKEND_URL}/user/login`,userData,
      {
        withCredentials:true,

      }
     )
     toast.success("login successfull")
     localStorage.setItem('user',JSON.stringify(response.data));
    //  navigate('/')
     redirect('/')
     
     
      
    } catch (error) {
      if(error.response){
      console.log("error in signup page",error)
      }
      
      
    }
     
    }
    


  return (
    <>
    <div className='bg-black flex justify-center text-white items-center h-screen w-screen'>
     <div className='w-[90vw] md:w-auto border-2 border-green-300 py-10 gap-5 px-10 rounded-2xl flex flex-col justify-center items-center  bg-gray-900'>
      <h2 className='text-4xl text-center'>Login <span className='text-green-400'>page</span></h2>
      <form onSubmit={handleSubmit(onSubmit)}>
       

        {/* Email Field */}
        <div>
        
          <input
            type="email"
            id="email"
            placeholder='Enter the email'
             className='bg-transparent px-2 py-2  my-2 text-2xl placeholder:text-gray-300 border-2 border-gray-500'
            required
            {...register("email", { required: true })}
          />
        </div>

        {/* Password Field */}
        <div>
          
          <input
            type="password"
            id="password"
            placeholder='Enter the password'
             className='bg-transparent px-2 py-2  my-2 text-2xl placeholder:text-gray-300 border-2 border-gray-500'
            required
            {...register("password", { required: true })}
          />
        </div>

        {/* Submit Button */}
        <div className='flex justify-between items-center mt-3'>
            <h1 className=''>New user?<Link to={"/Signup"} className='text-blue-500'>signup</Link></h1>
          <button className='bg-blue-500 rounded-2xl py-1 px-5  border-2 border-blue-500' type="submit">Login</button>
        </div>
      </form>
    </div>
      
    </div>
    </>
  )
}

export default Login
