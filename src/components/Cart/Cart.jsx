import React, { useContext, useEffect, useState } from 'react'
import classes from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import { Bars } from 'react-loader-spinner'


export default function Cart() {
 let Navigate= useNavigate()
  const { getCart, updateProduct, deleteProduct, deleteAllProducts } = useContext(CartContext);
  const [loadingPage, setLoadingPage] = useState(false)
    const [cartItems, setCartItems] = useState(null)

  async function getCartDetails() {
    setLoadingPage(true)
   let res= await getCart()
   console.log(res?.data);
    setLoadingPage(false)
  
   setCartItems(res?.data)
   
   }

   async function updateCartProduct(prodId,count) {
    let res= await updateProduct(prodId,count)
    console.log(res.data);
    setCartItems(res.data)
    }

    async function deleteCartProduct(prodId) {
      let res= await deleteProduct(prodId)
      console.log(res.data);
      setCartItems(res.data)     
      }

async function deleteCartItems() {
    let res= await deleteAllProducts()
    console.log(res);
    setCartItems([])
    Navigate('/');
    
}

useEffect(()=>{
   getCartDetails()
} ,[])

if (loadingPage ==true) {
    
  return (
    <div className='py-8 flex justify-center items-center'>
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}
  return (
    <>
      <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
    <div className='flex justify-between items-center container mx-auto px-4'>
        <h2 className='text-green-600 font-bold text-2xl py-10'>Shop Now</h2>
        <button onClick={()=>deleteCartItems()} className='btn btn-green '>Clear Cart</button>
    </div>
     

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
     
    
    {cartItems?.products?.map((product)=>
     <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
     <td className="p-4">
       <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
     </td>
     <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
       {product.product.title}
     </td>
     <td className="px-6 py-4">
       <div className="flex items-center">
         <button onClick={()=>{updateCartProduct(product.product.id,product.count-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
           <span className="sr-only">Quantity button</span>
           <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
           </svg>
         </button>
         <div>
     <span>{product.count}</span>
         </div>
         <button onClick={()=>{updateCartProduct(product.product.id,product.count+1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
           <span className="sr-only">Quantity button</span>
           <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
           </svg>
         </button>
       </div>
     </td>
     <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
       {product.price }
     </td>
     <td className="px-6 py-4">
       <button onClick={()=>{deleteCartProduct(product.product.id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
     </td>
   </tr>
    )}
    </tbody>
  </table>


  
  <h3 className='text-2xl text-gray-500 py-5 text-center'>Total Price <span className='text-green-600 text-2xl '>{cartItems?.totalCartPrice} EGP</span></h3>
  <Link to={"/checkout"} className='btn btn-green text-center w-1/4 block my-5  mx-auto'>Check Out </Link> 
  
  


</div>


    </>
  )
}
