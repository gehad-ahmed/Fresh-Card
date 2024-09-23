import React, { useContext, useEffect, useState } from 'react'
import classes from './Product.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'
import { Helmet } from "react-helmet";
import axios from 'axios';
import { Bars } from 'react-loader-spinner'

export default function Product({ product }) {

  const { addToCart, setCart, addToWishlist } = useContext(CartContext)
  const [loading, setLoading] = useState(false)
  const [productID, setProductID] = useState(null)
  const [showing, setShowing] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false)
  const [isWished, setIsWished] = useState(product.isWished || false);

  const headers = {
    token: localStorage.getItem("accessToken"),
  };

  async function addProductToCart(productId) {
    setProductID(productId)
    setLoading(true)
    const res = await addToCart(productId)
    if (res.status = 'success') {
      toast.success(res.message, {
        position: 'bottom-right',
        theme: 'dark'
      })
      setLoading(false)
    }
    else {
      toast.error('Something Went Wrong', {
        position: 'bottom-right',
        theme: 'dark'
      })
      setLoading(false)

    }
  }

  async function addProductToWishlist(productId) {
    setLoading(true);
    const res = await addToWishlist(productId);
    if (res.status === 'success') {
      toast.success(res.message, {
        position: 'bottom-right',
        theme: 'dark'
      });
      setIsWished(true); 
    } else {
      toast.error('Something Went Wrong', {
        position: 'bottom-right',
        theme: 'dark'
      });
    }
    setLoading(false);
  }

 

  return (

    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Product</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className='w-1/6 px-4 mb-4 product'>
        <Link
          to={`/product-details/${product.id}/${product.category.name}`}
        >

          <img className='mb-2' src={product.imageCover} alt={product.title} />
          <span className='mb-2 text-green-500'>{product.category.name}</span>
          <h2 className='text-lg font-semibold'>{product.title}</h2>
          <div className="flex justify-between text-gray-500 font-light w-full">
            <span>{product.price} EGP</span>
            <div className=''>
              <i className='fas fa-star text-yellow-300'></i>
              <span>{product.ratingsAverage}</span>
            </div>
          </div>


        </Link>
        <button onClick={() => addProductToWishlist(product.id)}>
          <div className={`wishlist-icon mt-5 text-2xl ${isWished ? 'text-red-500' : 'text-gray-500'}`}>
            <i className="fa-solid fa-heart"></i>
          </div>
        </button>

        <button onClick={() => addProductToCart(product.id)} className='btn btn-green w-full my-7'>{loading && productID == product.id ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add To Cart'} </button>

      </div>

    </>
  )
}
