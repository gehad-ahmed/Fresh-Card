import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [productID, setProductID] = useState(null);
  const [loadingPage, setLoadingPage] = useState(false);

  const { addToCart, addToWishlist, getWishList } = useContext(CartContext);

  async function getProducts() {
    try {
      setLoadingPage(true);
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      if (data && data.data.length > 0) {
        setProducts(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPage(false);
    }
  }

  async function getWishListData() {
    try {
      let res = await getWishList();
      const wishListData = res?.data || [];
      setWishlistProducts(new Set(wishListData.map(item => item.id)));
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductToCart(productId) {
    setProductID(productId);
    setLoading(true);
    try {
      const res = await addToCart(productId);
      if (res.status === 'success') {
        toast.success(res.message, {
          position: 'bottom-right',
          theme: 'dark'
        });
      } else {
        toast.error('Something Went Wrong', {
          position: 'bottom-right',
          theme: 'dark'
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function addProductToWishlist(productId) {
    try {
      const res = await addToWishlist(productId);
      if (res.status === 'success') {
        toast.success(res.message, {
          position: 'bottom-right',
          theme: 'dark'
        });
        setWishlistProducts(prev => new Set(prev).add(productId));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
    getWishListData();
  }, []);

  if (loadingPage) {
    return (
      <div className='py-8 flex justify-center items-center'>
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Products</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </div>
      <div className="container mx-auto">
        <div className='flex justify-around items-center flex-wrap cursor-pointer mt-8'>
          {products.map((product) => {
            const isProductInWishlist = wishlistProducts.has(product.id);
            
            return (
              <div key={product.id} className='w-1/3 px-4 mb-8 product'>
                <Link to={`/product-details/${product.id}/${product.category.name}`}>
                  <img className='mb-2' src={product.imageCover} alt={product.title} />
                  <span className='mb-2 text-green-500'>{product.category.name}</span>
                  <h2 className='text-lg font-semibold'>{product.title}</h2>
                  <div className="flex justify-between text-gray-500 font-light mb-5">
                    <span>{product.price} EGP</span>
                    <div>
                      <i className='fas fa-star text-yellow-300'></i>
                      <span>{product.ratingsAverage}</span>
                    </div>
                  </div>
                </Link>

                <button onClick={() => addProductToWishlist(product.id)}>
                  <div className={`wishlist-icon mt-5 text-2xl ${isProductInWishlist ? 'text-red-500' : 'text-gray-500'}`}>
                    <i className="fa-solid fa-heart"></i>
                  </div>
                </button>

                <button onClick={() => addProductToCart(product.id)} className='btn btn-green w-full mb-5'>
                  {loading && productID === product.id ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : 'Add To Cart'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
