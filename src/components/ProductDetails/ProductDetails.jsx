import React, { useContext, useEffect, useState } from 'react'
import classes from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";


export default function ProductDetails() {
  const [productsDetails, setProductsDetails] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
const [productID, setProductID] = useState(null)
const [loading, setLoading] = useState(false)
const [showing, setShowing] = useState(true);
const [loadingPage, setLoadingPage] = useState(false)
 const {addToCart ,addToWishlist}= useContext(CartContext)

const {id}= useParams()
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
   async function getProductDetails(id) {
    setIsLoading(true)    
      try {
     const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
     console.log(data.data);
        setProductsDetails(data.data)
        setError(null)
       
      }
      
      catch (error) {
        console.log(error)
        setError(error.response.data.message)
        setProductsDetails({})
      }
      finally{
        setIsLoading(false)
      }
    }
useEffect(()=>{
  getProductDetails(id)
},[id])

async function addProductToWishlist(productId) {
  setLoadingPage(true)
   let res= await addToWishlist(productId)
   if(res.status=='success'){
    toast.success(res.message, {
      position: 'bottom-right',
      theme: 'dark'
    })
    setLoadingPage(false)
    setShowing(!showing); // toggle the state
   }
 }

 
async function addProductToCart(productId){
  setProductID(productId)
  setLoading(true)
  const res= await addToCart(productId)
  if(res.status='success'){
      toast.success(res.message,{
        position:'bottom-right',
        theme:'dark'
      })
      setLoading(false)

  }
  else{
    toast.error('Something Went Wrong',{
      position:'bottom-right',
      theme:'dark'
    })
    setLoading(false)

  }
}



  return (
    <>
     <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Product Details</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
      <section className='py-20'>
        <div className="container mx-auto">
        { 
         error ?
          <div className='alert'>{error}</div>
          :
          <div className="row items-center">
              <div className='w-1/3 px-4'>
              <Slider {...settings}>
   {
    productsDetails?.images?.map((src,index) =>
  (
    <img key={index} src={src} alt={productsDetails.title} />

  )
  )
   }
     
    </Slider>
          </div>
          <div className="w-2/3 px-4">
             <h1 className='text-2xl mb-2'>{productsDetails.title}</h1>   

             <p className='mb-2 text-gray-500 font-light'>{productsDetails.description}</p>
             <div className="flex justify-between text-gray-500 font-light mb-2">
              <div>
                {/* ? معناها ان لو فيه productDetailsاعرضهالي 
                ولو عندك category هاتلي منها الName
                بيكون اسمه chain condition
                */}
                <p>{productsDetails?.category?.name}</p>
                <span>{productsDetails.price} EGP</span>
              </div>

              <div>
                    <i className='fas fa-star text-yellow-300'></i>
                    <span>{productsDetails.ratingsAverage}</span>
                  </div>

             </div>
             <button onClick={(()=>addProductToWishlist(productsDetails.id))}>
            {showing ? <div className="wishlist-icon mt-5 text-gray-500 text-2xl">
              <i class="fa-solid fa-heart"></i>
            </div>
              :
              <div className="wishlist-icon mt-5 text-red-500 text-2xl ">
                <i class="fa-solid fa-heart"></i>
              </div>

            }

          </button>
             <button onClick={()=>addProductToCart(productsDetails.id)} className='btn btn-green w-full'>{loading&& productID==productsDetails.id ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Add To Cart'} </button>
          </div>
            
          </div>
}
        </div>
      </section>

      <RelatedProducts />
    </>
  )
}
