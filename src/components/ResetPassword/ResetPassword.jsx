import React, { useEffect, useState } from 'react'
import classes from './ResetPassword.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';


export default function ResetPassword() {
  const Navigate= useNavigate()

  const initialValues={ 
    email:"",
    password:"",
  }
  const formik=  useFormik({
    initialValues,
    onSubmit:resetPassword,
    
  })

  async function resetPassword(values){
    try {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxx",values);
      
      let data=  await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)   
        console.log(data)
       if(data.status==200){
         Navigate('/')
       }
    }
     catch (error) {
      console.log(error.response.data.message)
  
    }
    
    }

  return (
    <>
    <div className='flex justify-center items-center mt-9'>

 <div className=''>
        <h1 className='text-bold text-3xl mb-5'>reset your account password </h1>
        <form onSubmit={formik.handleSubmit}>
        <input type="email" placeholder='enter your Email' className='w-full mb-4' 
          onChange={formik.handleChange} onBlur={formik.handleBlur} 
          value={formik.values.email} name="email"
          />
            <input type="password" placeholder='enter your password' className='w-full' 
          onChange={formik.handleChange} onBlur={formik.handleBlur} 
          value={formik.values.password} name="password"
          />
     
          <button className='btn btn-green mt-4' >Reset Password</button>
        </form>
      </div>  
      </div>
        </>
  )
}
