import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
// import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
// import Categories from './components/Categories/Categories'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import NotFound from './components/NotFound/NotFound'
import ErrorPage from './components/ErrorPage/ErrorPage'
import AuthContextProvider from './Context/AuthContext'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ProtectedRouts from './components/ProtectedRouts/ProtectedRouts'
import CartContextProvider from './Context/CartContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout/Checkout'
import { QueryClient ,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Wishlist from './components/Wishlist/Wishlist'
import { wishlistContext } from './Context/WishListContext';
// import { lazy } from 'react';
import {  Suspense, lazy } from 'react';
const Brands = lazy(() => import('./components/Brands/Brands'));
const Categories = lazy(() => import('./components/Categories/Categories'));

let query = new QueryClient()
function App() {
const router= createBrowserRouter([
  {
    path:"",
    element:<Layout />,
    errorElement:<ErrorPage />,
    children: [
      {
        index:true,
        element:(
          <ProtectedRouts> 
            <Home />
          </ProtectedRouts>
        )
      },
      {
        path:"/products",
        element:(
          <ProtectedRouts> 
            <Products />
          </ProtectedRouts>
        )
      },
      
      {
        path:"/cart",
        element: (
          <ProtectedRouts> 
            <Cart />
          </ProtectedRouts>
        )
      },{
        path:"/brands",
        element:(
          <Suspense fallback={<h2>Loading...</h2>}>
            <ProtectedRouts> 
              <Brands />
            </ProtectedRouts>
          </Suspense>
         
        )
      },
      
      {
        path:"/categories",
        element:(
          <Suspense fallback={<h2>Loading...</h2>}>
            <ProtectedRouts> 
               <Categories />
            </ProtectedRouts>
          </Suspense>
        
        )
      },
      {
        path:"/wishlist",
        element:(
          <ProtectedRouts> 
            <Wishlist />
          </ProtectedRouts>
        )
      },
      {
        path:"/checkout",
        element:(
          <ProtectedRouts> 
            <Checkout />
          </ProtectedRouts>
        )
      },
     
      {
        path:"/product-details/:id/:category",
        element:(
          <ProtectedRouts> 
            <ProductDetails />
          </ProtectedRouts>
        )
      },
      {
        path:"/login",
        element:<Login />
      },{
        path:"/register",
        element:<Register />
      },
      {
        path:"/forgetpassword",
        element:<ForgetPassword />
      },
      {
        path:"/verify-code",
        element:<VerifyCode />
      },
      {
        path:"/reset-password",
        element:<ResetPassword />
      },
   
      {
        path:"*",
        element:<NotFound />
      }
      
    ]
  }
])
  return (
    <QueryClientProvider client={query}>
  <AuthContextProvider>

      <CartContextProvider>
         <RouterProvider router={router} />
           <ReactQueryDevtools></ReactQueryDevtools>
           <ToastContainer />
      </CartContextProvider>
     

    </AuthContextProvider>

    </QueryClientProvider>
  
  )
}

export default App
