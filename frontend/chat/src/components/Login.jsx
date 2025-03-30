import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useAuth } from './context/AuthProvider';

const Login = () => {
  const [authUser,setauthUser]=useAuth();
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    
    


    async function onSubmit(data){
      
      const userdata={
          email:data.email,
          password:data.password
        }
       // console.log(userdata)
        await axios
        .post("http://localhost:3001/user/login",userdata)
        .then((Response) =>{
          //console.log(Response.data)
          if(Response.data){
            alert("login succesfully ")
          }
          localStorage.setItem("app", JSON.stringify(Response.data))
          setauthUser(Response.data)
        })
      .catch ((error) => {
        if(error.Response){
        alert("error", error.Response.data.error) 
        }
      } )
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
