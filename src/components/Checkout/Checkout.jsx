import React, { useContext, useEffect, useState } from 'react'
import classes from './Checkout.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';
import {Helmet} from "react-helmet";


export default function Checkout() {
 
 const{checkoutCart,cartId }= useContext(CartContext)


 
  const initialValues={ 
   
    phone:"",
    details:"",
    city:""
  }

async function handleCheckout(cartId,url) {
  let res= await checkoutCart(cartId,url,formik.values)
  console.log(res);
  if(res.status=="success"){
    window.location.href=res.session.url
  }
}

const formik=  useFormik({
  initialValues:initialValues,
  onSubmit:()=>{
    handleCheckout(cartId ,"http://localhost:5173")
  } 
})

    
  
  return (
    <>
     <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
    <div className="max-w-xl mx-auto">
      <h1 className='text-4xl font-bold mb-8 '>Pay Now</h1>
    </div>
<form className="max-w-xl mx-auto" onSubmit={formik.handleSubmit}>

  <div className="relative z-0 w-full mb-5 group">
      <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
      <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Details</label>
  </div>

  

  <div className="relative z-0 w-full mb-5 group">
      <input type="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}  name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}  name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder="" />
      <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City</label>
  
  </div>

 
 <button type='submit' 
 className='btn btn-green'> Pay Now </button>
  </form>
      </>
  )
}
