import React, { useEffect, useState } from 'react'
import classes from './SubCategories.module.css'
import {Helmet} from "react-helmet";
import axios from 'axios';

export default function SubCategories() {
  const [subCategories, setSubCategories] = useState([])
    
  async function getAllSubCategories(params) {
    try {
      console.log("5555555555555555555555" , params);
      let {data}=  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${params}/subcategories`)
          console.log("xxxxxxxxxxxxxxxxxxxxx",data.data);
          setSubCategories(data.data)
     
    } catch (error) {
      console.log(error);
    }
   
  }
 
 useEffect(()=>{
  getAllSubCategories()
 })
 
  return (
    <>
       <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>SubCategories</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
      <div className='flex justify-around items-center flex-wrap cursor-pointer mt-8 '>
      {
        subCategories?.map((subCategory)=>
        (
        
          <div className='w-full md:w-1/4 xl:w-1/5 m-3 hover:shadow-lg' >
            <div className='p-3 border rounded-md ' >
              <h2 className='text-center text-green-700 text-3xl text-bold mt-4'>{subCategory.name}</h2>
            </div>
          </div>
           
        ))
      }
      </div>
    </>
  )
}
