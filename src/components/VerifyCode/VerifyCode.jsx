import React, { useEffect, useState } from 'react'
import classes from './VerifyCode.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom';



export default function VerifyCode() {
  const Navigate=useNavigate()
  const initialValues={ 
    resetCode:"",
  }
  const formik=  useFormik({
    initialValues,
    onSubmit:verifyCode,
    
  })

 async function verifyCode(value){
  try {
    console.log("hhhh",value);
    
    let data=  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,value)   
      console.log(data)
     if(data.status===200){
        Navigate('/reset-password')
     }
  }
   catch (error) {
    console.log(error
    )
  

  }
  
  }
  return (
       <>
    <div className='flex justify-center items-center mt-9'>
    <div className=''>
        <h1 className='text-bold text-3xl mb-5'>reset your account password </h1>
        <form onSubmit={formik.handleSubmit}>
          
          <input type="text" placeholder='enter your Code' className='w-full' 
          onChange={formik.handleChange} onBlur={formik.handleBlur} 
          value={formik.values.resetCode} name="resetCode"
          />
          <button className='btn btn-green mt-4' >Verify</button>
        </form>
      </div>
    </div>
     
    </>
  )
}
