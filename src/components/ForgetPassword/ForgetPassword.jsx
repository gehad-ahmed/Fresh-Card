import React, { useEffect, useState } from 'react'
import classes from './ForgetPassword.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';


export default function ForgetPassword() {
  const Navigate= useNavigate()

  const initialValues={ 
    email:"",
  }
  const formik=  useFormik({
    initialValues,
    onSubmit:forgetPassword,
    
  })

 async function forgetPassword(value){
  try {
    
    let data=  await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,value)   
      console.log(data)
     if(data.status==200){
       Navigate('/verify-code')
     }
  }
   catch (error) {
    console.log(error.response.data.message)
    alert(error.response.data.message)

  }
  
  }
 
  return (
    <>
    <div className='flex justify-center items-center mt-9'>
    <div className=''>
        <h1 className='text-bold text-3xl mb-5'>please enter your verification code </h1>
        <form onSubmit={formik.handleSubmit}>
          
          <input type="email" placeholder='enter your Email' className='w-full' 
          onChange={formik.handleChange} onBlur={formik.handleBlur} 
          value={formik.values.email} name="email"
          />
          <button className='btn btn-green mt-4'>Verify</button>
        </form>
      </div>
    </div>
     

    </>
  )
}
