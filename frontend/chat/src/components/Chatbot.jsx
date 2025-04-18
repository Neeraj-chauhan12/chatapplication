import React, { useState } from 'react'
import { FaCode } from "react-icons/fa";
import { GiRingedPlanet } from "react-icons/gi";
import { FaPython } from "react-icons/fa6";
import { AiFillWechat } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MdLogout } from "react-icons/md";
import axios from 'axios';
import Cookies from 'js-cookie'
import { useAuth } from './context/AuthProvider';

const Chatbot = () => {

  const [authUser,setauthUser]=useAuth();
  const [message, setmessage]=useState("")
  const [isresponse,setisresponse]=useState(false)
  const [messages, setmessages]=useState([]);
  //let allmessage=[];


  const handleclick =async ()=>{
    try {
      await axios
      .post("http://localhost:3001/user/logout")
      localStorage.removeItem("app")
      Cookies.remove("jwt") 
      alert("logout succesfully")
      window.location.reload();
    } catch (error) {
      console.log("error,",error)
      
    }

  }  

 
  const hitrequest = () =>{
    if(message){
      generateresponse(message);
    }
    else{
      alert("you must right something....")
    }
  }

  const generateresponse =async (msg) =>{
      if(!msg) return;
    
      
    const genAI = new GoogleGenerativeAI("AIzaSyCDM4b1iRCwpVSLHReK3mt6TWwzob6kvJA");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    console.log(result.response.text())

    const allmessage = [
      ...messages,
      {type:"user" , text:msg},
      {type:"response",text:result.response.text()}
    ];

    // allmessage.push({
    //   type:"user",
    //   text:msg,
    // },
    // {
    //   type:"response",
    //   text:result.response.text(),
    // }
  //)
    setmessages(allmessage);
    setisresponse(true);
    setmessage("");
    console.log(result.response.text());


   }


  return (
    <>
    <div className='h-screen text-white w-screen bg-black flex flex-col   items-center'>
      <div className='flex justify-between items-center gap-32 md:gap-[68vw] mt-5 mb-3.5'>
      <h1 className='md:text-2xl  min-w-20 '>WELCOME <span className='md:text-3xl text-2xl text-green-500 '>{authUser.newuser.name}</span>
      </h1>
      <button onClick={handleclick} className='bg-red-500 rounded-3xl border-2 border-red-600 md:text-2xl flex items-center md:px-3 px-2 py-1 md:py-2 gap-2 '>Logout  <MdLogout/></button>

      </div>
      
      

        {
            isresponse ? <>
            <div className='scroll h-[80vh] w-[80vw]  overflow-scroll '>
                <div className='flex justify-between items-center text-3xl px-5 py-3  '>
                    <h1>AssistMe</h1>
                    <h1>NewChat</h1>
                </div>
                 <div className='messages flex flex-col gap-2 md:gap-5'>
                   {
                    messages?.map((msg,index) => {
                      return(
                        <div key={index} className={msg.type}>{msg.text}</div>
                      )
                    })
                   } 



                 {/* <div className='user'>What is your name</div>
                <div className='response'>mY NAME IS AI</div> */}

                 </div>

                 <div className='absolute bottom-5 md:bottom-2 md:left-40 left-2 flex'>
            <input type="text" value={message} onChange={(e)=>{setmessage(e.target.value)}} placeholder='Write something here' className='w-[80vw] md:w-[70vw]  text-3xl outline-none py-2 px-3 rounded-4xl bg-gray-700'  />
            { message==""? "" : <IoSend className='text-5xl text-green ' onClick={hitrequest} />}
       
       </div>       
               
            </div>

            </> :
            <div className='h-[80vh] w-[80vw] flex flex-col  items-center relative'>
            <h1 className='text-white text-5xl md:text-8xl mt-20'>AssistMe</h1>
       
            <div className=' md:h-[30vh]  md:w-[60vw]  mt-5 md:mt-5 flex gap-5  md:flex-wrap  flex-wrap md:gap-12 p-1 md:p-10 md:pl-16'>
       
             <div className='h-[20vh] w-32 md:w-40 relative p-2 hover:bg-gray-700 bg-gray-700'>
               <h1>What is coding <br/> How we can learn it</h1>
               <FaCode className='text-3xl absolute bottom-2 right-2'/>
             </div>
             <div className='h-[20vh] w-32 md:w-40 p-2 bg-gray-800 hover:bg-gray-700 relative'>
              <h1>Which is the red <br/> planet of solar <br/> system.</h1>
               <GiRingedPlanet className='text-3xl absolute bottom-2 right-2'/>
             </div>
             <div className='h-[20vh] w-32 md:w-40 p-2 bg-gray-800 hover:bg-gray-700 relative'>
               <h1 >In which year python <br/> was invented</h1>
               <FaPython className='text-3xl absolute bottom-2 right-2'/>
             </div>
             <div className='h-[20vh] w-32 md:w-40 p-2 bg-gray-800 hover:bg-gray-700 relative'>
               <h1 >How we can use <br/> the Ai for Adopt</h1>
               <AiFillWechat className='text-3xl absolute bottom-2 right-2'/>
             </div>
            </div>
            <div className='absolute gap-3 bottom-0 md:bottom-5 flex'>
            <input type="text" onChange={(e)=>{setmessage(e.target.value)}} placeholder='Write something here' className='w-[80vw] md:w-[60vw] text-3xl outline-none py-2 px-3 rounded-4xl bg-gray-700'  />
            { message==""? "" : <IoSend className='text-5xl text-green ' onClick={hitrequest} />}
       
       </div>
           </div>
        }


    </div>
      
    </>
  )
}


export default Chatbot;
