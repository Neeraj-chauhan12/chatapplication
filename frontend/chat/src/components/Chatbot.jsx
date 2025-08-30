import React, { useEffect, useRef, useState } from 'react'
import { PiLinkSimpleDuotone } from "react-icons/pi";
import { FaArrowUpLong } from "react-icons/fa6";
import { GoogleGenerativeAI } from "@google/generative-ai"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import pic from '../../public/pr.jpg'
import { BACKEND_URL } from '../utils/Util';
import axios from 'axios';
import toast from 'react-hot-toast';
import { redirect, useNavigate } from 'react-router-dom';


const Chatbot = () => {
    const [inputValue,setInputValue]=useState("")
    const [typeValue,setTypeValue]=useState("")
    
    const [promt,setPromt]=useState([])
    const [loading,setLoading]=useState(false)
   

     const user = JSON.parse(localStorage.getItem('user'));
     console.log("user",user)
   
    const promtEndRef = useRef();
   
    const navigate=useNavigate();

      useEffect(() => {
       promtEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [promt, loading]);

  

  const handleclick=async()=>{

    const trimmed=inputValue.trim()
    if(!trimmed) return
    setInputValue("")
    setTypeValue(trimmed)
    setLoading(true)

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCDM4b1iRCwpVSLHReK3mt6TWwzob6kvJA");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(trimmed);
      const data= result.response.text()
      console.log(data)
 
      setPromt((prev)=>[
        ...prev,
        {role:"user",trimmed},
        {role:"assistant",data }
      ])
      
    } catch (error) {
       setPromt((prev)=>[
        ...prev,
        {role:"user",trimmed},
        {role:"assistant",data:"something went wrong the ai response"}
      ])
      
    }
    finally{
      setLoading(false)
      setTypeValue(null)

    }
   }


  const handleEnter=(e)=>{
    if(e.key==="Enter"){
        handleclick()
    }
   }


   const handleLougout = async()=>{

     try {

      const response=await axios.get(`${BACKEND_URL}/user/logout`,{
        withCredentials:true
      })
  
      localStorage.removeItem("user")
      localStorage.removeItem("token")
      toast.success("logout succefully")  
      navigate('/login')  
    } catch (error) {
      console.log("error in logout",error)
      toast.error(error.response.data.error || "logout error")
      
    }

   }


  return (

     <>

     <div className='h-[10vh] bg-gray-800 text-white flex justify-between items-center px-3 pr-5'>
      <h1 className='md:text-2xl'>Neeraj Chatbot</h1>
      <div className='flex justify-between items-center '>
        
           <img className='md:h-10 md:w-10 h-5 w-5  rounded-full object-contain' src={pic} alt="" />
           {user &&  <h1 className='md:text-2xl'>{user.newuser.name}</h1>}
         
         
           <button className='bg-red-400 ml-5 md:px-5 md:py-2 px-3 py-1 border-2 rounded hover:bg-red-500' onClick={handleLougout}>Logout</button>
      </div>

     </div>

     <div className='h-[calc(100vh-10vh)] w-screen bg-gray-900 flex justify-center items-center flex-col text-white'> 
    
        
      <div className='flex justify-center items-center flex-col'>
           <h1 className='md:text-4xl text-3xl mb-2'>Hey I'm Chatbot</h1>
            <h4 className='text-sm mb-3'>How can i help today?</h4>
         </div>
            


         {/* Prompt  */}
         
                    {/* ➤ Scrollable Chat Box */}
      <div className="chat w-full md:w-[70vw] rounded pt-3 bg-gray-700 max-w-4xl flex-1 overflow-y-auto mt-3 md:mt-4 mb-2 space-y-4 max-h-[60vh] px-1">
        {promt.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" ? (
              // 🧠 Full-width assistant response
              // <div className="w-[70%] bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
              //   <ReactMarkdown
              //     remarkPlugins={[remarkGfm]}
              //     components={{
              //       code({  inline, className, children, ...props }) {
              //         const match = /language-(\w+)/.exec(className || "");
              //         return !inline && match ? (
              //           <SyntaxHighlighter
              //             style={codeTheme}
              //             language={match[1]}
              //             PreTag="div"
              //             className="rounded-lg mt-2"
              //             {...props}
              //           >
              //             {String(children).replace(/\n$/, "")}
              //           </SyntaxHighlighter>
              //         ) : (
              //           <code
              //             className="bg-gray-800 px-1 py-0.5 rounded"
              //             {...props}
              //           >
              //             {children}
              //           </code>
              //         );
              //       }
              //     }}
              //   >
              //     {msg.response}
              //   </ReactMarkdown>
              // </div>


              <div className="w-[70%] bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
               {msg.data}
              </div>
              

              
            ) : (
              // 👤 User message - 30% width at top-right
              <div className="w-[30%] bg-blue-600 text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap self-start">
                {msg.trimmed}
              </div>
            )}
          </div>
        ))}



        {/* {typed value here} */}
          {loading && typeValue && (
          <div
            className="whitespace-pre-wrap px-4 py-3 rounded-2xl text-sm break-words
           bg-blue-600 text-white self-end ml-auto max-w-[40%]"
          >
            {typeValue}
          </div>
        )}

                    {/* 🤖 Typing Indicator */}
        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-xl text-sm animate-pulse">
              🤖Loading...
            </div>
          </div>
        )}


 
           </div>

        <div ref={promtEndRef} />


         
            {/* INPUT  BOX */}
            
            <div className='p-3 rounded-2xl w-[95vw] md:w-[58vw] bg-gray-600'>
            <input
            value={inputValue}
            onKeyDown={handleEnter}
            onChange={(e)=>setInputValue(e.target.value)}
            placeholder='Message Chatbot...'
            className='border-none focus:outline-none focus:ring-0 w-full mb-2' 
            type="text" 
            />

            <div className='flex justify-between items-center '>
                <div className='flex gap-2'> 
                    <h1 className='border-2  rounded md:rounded-3xl md:px-3 px-2 py-1 md:py-2'>Chatbot</h1>
                     <h1 className='border-2 rounded  md:rounded-3xl md:px-3 px-2 py-1 md:py-2'>Search</h1> </div>
                <div className='flex gap-2'>
                    <h1 className='border-2 py-2 px-2 rounded-full'><PiLinkSimpleDuotone /></h1>
                    <h1 onClick={handleclick} className='border-2 py-2 px-2 rounded-full'><FaArrowUpLong /></h1></div>
            </div>

            </div>
    

  </div>
  </>
  )
  }
  export default Chatbot