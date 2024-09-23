import React, { useEffect, useState } from 'react'
import classes from './RelatedProducts.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Product from '../Product/Product'
import {Helmet} from "react-helmet";


export default function RelatedProducts() {  

  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const {category}= useParams()

  async function getRelatedProducts() {

   
  setIsLoading(true)
      try {
     const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    //  console.log(data.data);
   
    const res=  data.data.filter((product)=> product.category.name == category)
    setProducts(res)
    console.log(res)
        setError(null)
      }

      catch (error) {
        console.log(error)
        setError(error.response.data.message)
        setProducts([])
      }
      finally{
        setIsLoading(false)
      }
    }
useEffect(()=>{
    getRelatedProducts()
},[])
  return (
    <>
    <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Related Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
    <section className='py-20'>
      <div className="container mx-auto ">
       {
        error ?
        <div className='alert'>{error}</div>
        :
        <div className="flex justify-between flex-wrap w-full">
        {products.map((product)=>
          (
           <Product key={product.id} product={product} />
          )

        )}
        </div>
       }   
      </div>
    </section>
  </>
  )
}
