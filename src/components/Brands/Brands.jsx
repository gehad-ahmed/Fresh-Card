import React, { useEffect, useState } from 'react'
import classes from './Brands.module.css'
import {Helmet} from "react-helmet";
import axios from 'axios';
import { Button, Modal } from "flowbite-react";
import { Bars } from 'react-loader-spinner'


export default function Brands() {
    const [brands, setBrands] = useState([])
    const [openModal, setOpenModal] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false)
   const [specificBrandState, setSpecificBrandState] = useState([])
    async function getBrands(){
      setLoadingPage(true)
      try {
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
        // console.log(data.data)
      setLoadingPage(false)
      setOpenModal(false)
        setBrands(data.data)
      } 
      catch (error) {
        console.log(error)
      setLoadingPage(false)
      }
    }


    async function specificBrand(id){
      try {
        let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        console.log(data.data)
        setSpecificBrandState(data.data) 
        setOpenModal(true)
      }
      catch(error){
        console.log(error)
      }
    }


    useEffect(()=>{
      getBrands()
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

  return ( <>
     <div>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      </div>
      <h2 className='text-5xl text-extrabold text-green-600 text-center my-7'>All Brands </h2>
      <div className='flex justify-around items-center flex-wrap cursor-pointer mt-8 '>
      {
        brands.map((brand)=>
        (
        
          <div className='w-full md:w-1/4 xl:w-1/5 m-3 hover:shadow-lg' onClick={(()=>specificBrand(brand._id))}>
            <div className='p-3 border rounded-md' key={brand._id}>
              <img src={brand.image} alt={brand.name} className='w-full md:w-[400px] h-[300px]' />
              <h2 className='text-center text-3xl text-bold'>{brand.name}</h2>
            </div>
          </div>
          
        ))
      }
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>

        <div className='container mx-auto py-9'>
        <Modal.Body>
          <div className="space-y-6 flex justify-between items-center flex-wrap">
            <div>
              <span className='bold text-5xl text-green-600 mb-8 block'>{specificBrandState.name}</span>
              <p className='text-3xl text-gray-600'>{specificBrandState.slug}</p>
            </div>
            <img src={specificBrandState.image} alt="" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='flex justify-end items-end w-full'>
            <Button color="gray" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </div>
         
        </Modal.Footer>
        </div>       
     

      </Modal>
</>
  )
}
