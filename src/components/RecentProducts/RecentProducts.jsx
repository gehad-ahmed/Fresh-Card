import React, { useEffect, useState } from 'react'
import classes from './RecentProducts.module.css'
import axios from 'axios';
import Product from '../Product/Product';
import { Helmet } from "react-helmet";
import { useQuery } from '@tanstack/react-query';
import { Bars, Blocks } from 'react-loader-spinner'
import { useContext } from 'react';
import { CartContext } from './../../Context/CartContext';

export default function RecentProducts() {
  const [products, setProducts] = useState([])
  const [errorState, setErrorState] = useState(null)
  const [Loading, setLoading] = useState(false)
  let { getWishList } = useContext(CartContext)



  function getRecentProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isFetching, error, isLoading } = useQuery({
    queryKey: ["recentProductsWithWishlist"],
    queryFn: () => compareWishListAndRecentProducts(getWishList),
    staleTime: 2000
  });


  async function getWishListData(getWishList) {
  let res = await getWishList();
  return res?.data || [];
}

async function compareWishListAndRecentProducts(getWishList) {
  const recentProductsResponse = await getRecentProducts();
  const wishListResponse = await getWishListData(getWishList);

  const recentProducts = recentProductsResponse?.data?.data || [];
  const wishListProducts = wishListResponse || [];

  if (wishListProducts.length === 0) {
    console.log('Wish List is empty. No common products to display.');
    return recentProducts;
  }

  const updatedProducts = recentProducts.map(product => {
    const isWished = wishListProducts.some(wishItem => wishItem.id === product.id);
    return {
      ...product,
      isWished: isWished
    };
  });

  console.log('Updated Recent Products:', updatedProducts);
  return updatedProducts;
}
  
  if (isLoading) {
    return <>
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
    </>

  }


  return (
    <>

      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Recent Products</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>

      <section className='py-20'>
        <div className="container mx-auto ">
          <div className="flex justify-between flex-wrap w-full">

            {data.map((product) =>
            (
              <Product key={product.id} product={product} />
            )

            )}
          </div>
        </div>
      </section>
    </>
  )
}
