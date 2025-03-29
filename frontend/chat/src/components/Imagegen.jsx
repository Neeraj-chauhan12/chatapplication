import React, { useRef, useState } from 'react'
import pic from '../../public/first.webp'
import axios from 'axios'

const Imagegen = () => {
 
    const [imageurl,setimageurl]=useState("");
    const [prompt,setprompt]=useState("")

    async function imagegenerator(){
        const apikey="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";
         const api= "https://api.openai.com/v1/images/generations";

         try {
          const response=await axios.post(api,
            {
              model:"dall-e-2",
              prompt:prompt,
              n:1,
            },
            {
              headers:{
                Authorization:`Bearer ${apikey}`,
                "Content-Type":"application/json",
              }
            }

          );
          console.log(response)
          
         } catch (error) {
          console.log("error generating image",error)
          
         }
         
         

        

    }



  return (
    <>
      <div className='h-screen w-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-5'>
        <div className='flex justify-center items-center '>
        <h1 className='uppercase text-7xl '>image generator</h1>
        </div>

        <div className='flex justify-center items-center py-3 px-5 gap-5 mt-5'>
            <input type="text"
            value={prompt}
            onChange={(e)=>setprompt(e.target.value)}
             className='bg-transparent border-2 border-gray-100 placeholder:text-white text-3xl py-2' 
             placeholder='Search the image....' />
            <button 
            onClick={imagegenerator}
            className='py-3 px-12 text-2xl rounded border-2 border-blue-400 bg-gradient-to-bl from-blue-700 via-blue-400 to-blue-700'
            >Click here</button>
        </div>

        <div className='flex justify-center items-center'>
            <div className='w-[70vw] h-[60vh] bg-red-500'>
                <img className='h-[60vh] w-[70vw] bg-cover'

                 src={imageurl===""? pic: imageurl} alt="" />

            </div>

        </div>
       
       

      </div>
    </>
  )
}

//https://api.openai.com/v1/images/generations
//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

export default Imagegen;




