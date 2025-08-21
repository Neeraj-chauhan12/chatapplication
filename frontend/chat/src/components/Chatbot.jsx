import React, { useState } from 'react'
import { PiLinkSimpleDuotone } from "react-icons/pi";
import { FaArrowUpLong } from "react-icons/fa6";
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useAuth } from './context/AuthProvider';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Paperclip, ArrowUp, Globe, Bot } from "lucide-react";


const Chatbot = () => {
    const [inputValue,setInputValue]=useState("")
    const [typeValue,setTypeValue]=useState("")
    
    const [promt,setPromt]=useState([])
    const [loading,setLoading]=useState(false)
  

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
      const response=result.response.text()
      console.log(response)
 
      setPromt((prev)=>[
        ...prev,
        {role:"user",trimmed},
        {role:"asistent", response }
      ])
      
    } catch (error) {
       setPromt((prev)=>[
        ...prev,
        {role:"user",trimmed},
        {role:"asistent",response:"something went wrong the ai response"}
      ])
      
    }
    finally{
      setLoading(false)
      setTypeValue(null)

    }
   }


  //let allmessage=[];


  const handleEnter=(e)=>{
    if(e.key==="Enter"){
        handleclick()
    }
   }


  return (
     <div> 
    
        
      <div className='flex justify-center items-center flex-col'>
           <h1 className='text-3xl'>Hey I'm Chatbot</h1>
            <h4 className='text-sm mb-3'>How can i help today?</h4>
         </div>
            


         {/* Prompt  */}
         
                    {/* ➤ Scrollable Chat Box */}
      <div className="w-full max-w-4xl flex-1 overflow-y-auto mt-6 mb-4 space-y-4 max-h-[60vh] px-1">
        {promt.map((msg, index) => (
          <div
            key={index}
            className={`w-full flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" ? (
              // 🧠 Full-width assistant response
              <div className="w-full bg-[#232323] text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={codeTheme}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg mt-2"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className="bg-gray-800 px-1 py-0.5 rounded"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {msg.response}
                </ReactMarkdown>
              </div>
            ) : (
              // 👤 User message - 30% width at top-right
              <div className="w-[30%] bg-blue-600 text-white rounded-xl px-4 py-3 text-sm whitespace-pre-wrap self-start">
                {msg.trimmed}
              </div>
            )}
          </div>
        ))}

 
           </div>

         
            {/* INPUT  BOX */}
            
            <div className='p-3 rounded-2xl w-[50vw] bg-gray-600'>
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
                    <h1 className='border-2 rounded-3xl px-3 py-2'>Chatbot R1</h1>
                     <h1 className='border-2 rounded-3xl px-3 py-2'>Search</h1> </div>
                <div className='flex gap-2'>
                    <h1 className='border-2 py-2 px-2 rounded-full'><PiLinkSimpleDuotone /></h1>
                    <h1 onClick={handleclick} className='border-2 py-2 px-2 rounded-full'><FaArrowUpLong /></h1></div>
            </div>

            </div>
    

  </div>
  )
  }
  export default Chatbot