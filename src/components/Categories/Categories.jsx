import React, { useEffect, useState } from 'react'
import classes from './Categories.module.css'
import {Helmet} from "react-helmet";
import axios from 'axios';
import SubCategories from './../SubCategories/SubCategories';
import { Bars } from 'react-loader-spinner'


export default function Categories() {

  const [categories, setCategories] = useState([])
  const [Loading, setLoading] = useState(false)
  const [subCategories, setSubCategories] = useState([])
  const [categoryName, setcategoryName] = useState("")
  const [loadingPage, setLoadingPage] = useState(false)



  async function getAllSubCategories(params , name) {
  
    setcategoryName(name)

    let {data}=  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${params}/subcategories`)
    console.log("xxxxxxxxxxxxxxxxxxxxx",data.data);
    setSubCategories(data.data , name)
  }
 async function getCategories(){
  setLoadingPage(true)
   try {
    let {data}=  await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    console.log(data.data)
    setLoadingPage(false)
    setCategories(data.data)
   } catch (error) {
    console.log(error)
    setLoadingPage(false)
   }

  }

useEffect(()=>{
  getCategories()
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
     <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
      <div className='flex justify-around items-center flex-wrap cursor-pointer mt-8 '>
      {
        categories.map((category)=>
        (
        
          <div onClick={()=>getAllSubCategories(category._id , category.name)} className='w-full md:w-1/4 xl:w-1/5 m-3 hover:shadow-lg' >
            <div className='p-3 border rounded-md ' key={category._id}>
              <img src={category.image} alt={category.name} className='w-full md:w-[400px] h-[300px]' />
              <h2 className='text-center text-green-700 text-3xl text-bold mt-4'>{category.name}</h2>
            </div>
          </div>
           
          ))
        }
        </div>  

      <div>

      <h2 className='text-center text-4xl text-bold my-4 text-green-500'>
        {categoryName && categoryName + " Subcategories"}</h2>
  
        <div className="flex flex-wrap justify-center items-center mb-8">
        {subCategories.map((subCategory)=>(
          //  <div className='p-1'>
          <div key={subCategory._id} className=' w-full md:w-1/4 xl:w-1/5 m-3 p-5 border rounded-md border-2 hover:shadow-lg'>
           
            <h3 className='text-2xl text-bold text-center'>{subCategory.name}</h3>

            {/* </div> */}
          </div>
        ))}
        </div>
       
      </div>
    </>
  )
}
