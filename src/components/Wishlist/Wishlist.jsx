import React, { useContext, useEffect, useState } from 'react'
import classes from './Wishlist.module.css'
import axios from 'axios';
import { Bars } from 'react-loader-spinner'
import { wishlistContext } from '../../Context/WishListContext';
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'

export default function Wishlist() {
  const [loadingPage, setLoadingPage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [productID, setProductID] = useState(null)
  const [getWishListState, setGetWishListState] = useState(null)

let {getWishList, removeFromWishlist ,addToCart} =useContext(CartContext)

async function getWishListData() {
   setLoadingPage(true)
  let res = await getWishList()
     setLoadingPage(false)
     console.log(res?.data)
     if (res?.data.length> 0) {
      
       setGetWishListState(res.data) 
     }
    
}
 

async function deleteProductFromWishlist(id) {
  let res = await removeFromWishlist(id)
  if (res?.status == 'success') {
    getWishListData()
  }
}

async function addProductToCart(productId) {
  setProductID(productId)
  setLoading(true)
  const res = await addToCart(productId)
  console.log(res)

  if (res.status = 'success') {
    toast.success(res.message, {
      position: 'bottom-right',
      theme: 'dark'
    })
    setLoading(false)
    deleteProductFromWishlist(productId)
  }
  else {
    toast.error('Something Went Wrong', {
      position: 'bottom-right',
      theme: 'dark'
    })
    setLoading(false)

  }
}



      useEffect(() => {
        getWishListData()
      },[])

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
    <div className="container mx-auto">
    <table className='mt-8 w-full mx-auto'>
   <h1 className='text-4xl mb-7'>My Wishlist </h1>
   <tbody className=''>
   
     {getWishListState&&getWishListState.length>0&&getWishListState.map((product)=>
     
      <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        <div className='mb-6 text-2xl'>
          {product.title}
        </div>
        <div className='text-green-600 text-xl mb-6'>
           {product.price }
        </div>
        <div>
            <button onClick={()=>{deleteProductFromWishlist(product.id)}} className="font-medium text-red-600 dark:text-red-500 hover:underline"><i class="fa-solid fa-trash-can"></i> Remove</button>
        </div>
      </td>
      <td>
        <button onClick={(()=>addProductToCart(product.id))} className='btn btn-green w-full my-7'>{loading && productID == product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add To Cart'} </button>
      </td>
     
    </tr>
     )}
     </tbody>
   </table>
    </div>
  
    </>
  )
}
