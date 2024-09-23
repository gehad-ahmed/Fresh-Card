import React, { useContext, useEffect, useState } from 'react'
import classes from './Login.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import {Helmet} from "react-helmet";

export default function Login() {
  const [error, setError] = useState(null)
  const [isLoading, setisLoading] = useState(false)
 const{setAccessToken}= useContext(AuthContext)
 const Navigate= useNavigate()
 
  const initialValues={ 
    email:"",
    password:"",
  }
  const validationSchema=Yup.object({
    email:Yup.string().email().required("Email is Required"),
    password:Yup.string().min(8, 'Password must be 8 characters long')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter'),
    
      })

  const formik=  useFormik({
      initialValues:initialValues,
      onSubmit:handleLogin,
      validationSchema,
      
    })
    
   async function handleLogin(values){
      console.log("submit",values)
      setisLoading(true)
      try{
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
        if(data.message==='success'){
          setAccessToken(data.token)
          localStorage.setItem("accessToken",data.token)
   Navigate("/")
            setError(null)
        }
     
        console.log(data)
      }
    catch(error){
      console.log(error)
      setError(error.response.data.message)
    }
    finally{
      setisLoading(false)
    }

    }
  return (
    <>
     <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
    <div className="max-w-xl mx-auto">
      <h1 className='text-4xl font-bold mb-8 '>Login</h1>
    </div>
<form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>
{error && <div className='alert '>{error}</div>}
  

  <div className="relative z-0 w-full mb-5 group">
      <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}  name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
   {formik.errors.email &&formik.touched.email&&  <div className="text-red-500">{formik.errors.email}</div> }
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}  name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password &&formik.touched.password&&  <div className="text-red-500">{formik.errors.password}</div> }
  
  </div>

 <div className="flex justify-between items-center ">
    <button  type='submit' disabled={!(formik.isValid&& formik.dirty)} 
      className='btn btn-green'> {isLoading ? <i className='fas fa-spinner fa-spin'></i> :'Login'}</button>
    <button className='text-green-500 text-bold text-2xl' onClick={(()=>Navigate("/forgetPassword"))}>Forget Your Password?</button>
 </div>
 
  </form>
      </>
  )
}
