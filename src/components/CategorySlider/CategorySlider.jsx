import React, { useEffect, useState } from 'react'
import classes from './CategorySlider.module.css'
import axios from 'axios'
import Slider from "react-slick";
import {Helmet} from "react-helmet";
export default function CategorySlider() {
  
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3
  };


  async function getCategories() {
   
  setIsLoading(true)
      try {
     const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    
   
    setCategories(data.data)
    console.log(data.data)
        setError(null)
      }

      catch (error) {
        console.log(error)
        setError(error.response.data.message)
        setCategories([])
      }
      finally{
        setIsLoading(false)
      }
    }
useEffect(()=>{
  getCategories()
},[])
  return (
    <>
     <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Category Slider</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
      <section className='py-20'>
        <div className="container mx-auto ">
          
          <Slider {...settings}>
            {categories.map((category)=>
            (
              <div key={category.id}>
                <img src={category.image} alt="" className={classes.CategoryImage} />
                <h2 className='mt-2'>{category?.name}</h2>
              </div>

            )
            )}
          </Slider>
        </div>
      </section>
    </>
  )
}
