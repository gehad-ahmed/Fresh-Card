import React, { useContext, useEffect, useState } from 'react'
import classes from './Navbar.module.css'
// import logo from '../../assets/images/freshcart-logo.svg'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {
  const Navigate = useNavigate()
  const { cart } = useContext(CartContext)
  const { accessToken, setAccessToken } = useContext(AuthContext)

 function handleLogout() {
  console.log("Attempting to log out...");
  localStorage.removeItem("accessToken");
  setAccessToken(null);

  Navigate("/login");
}

  return (
    <>
      <nav className='bg-gray-100 p-4 static lg:fixed top-0 end-0 start-0 z-50'>
        <div className='container mx-auto'>
          <div className="flex justify-between items-center flex-col lg:flex-row">

            <div className='flex items-center flex-col lg:flex-row'>
              <Link to={""}>
                <img src={logo} alt="fresh cart logo" />
              </Link>
              {
                accessToken &&
                <ul className='flex flex-col lg:flex-row items-center'>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={""}>Home </NavLink >
                  </li>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/products"}>Products </NavLink >
                  </li>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/categories"}>Categories </NavLink >

                  </li>

                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/brands"}>Brands </NavLink >

                  </li>
                  <li className='my-2 lg:my-0'>
                    <NavLink className={"p-2"} to={"/wishlist"}>Wish List </NavLink >

                  </li>


                </ul>
              }

            </div>

            <div>
              <ul className='flex flex-col lg:flex-row items-center'>
                {
                  accessToken ? (
                    <>
                      <li className='my-2 lg:my-0'>
                        <NavLink className={"p-2"} to={"/cart"}> <i class="fa-solid fa-cart-shopping text-2xl"> </i>{cart?.numOfCartItems} </NavLink >

                      </li>

                      <li className='my-2 lg:my-0'>
                        <button className={"p-2"} onClick={handleLogout}>Logout </button>
                      </li>

                    </>)
                    : (<>
                      <li className='my-2 lg:my-0'>
                        <NavLink className={"p-2"} to={"/login"}>Login </NavLink >
                      </li>
                      <li className='my-2 lg:my-0'>
                        <NavLink className={"p-2"} to={"/register"}>Register </NavLink >
                      </li>
                    </>)

                }



                <li>
                  <a href="" className='fab fa-facebook mx-2'></a>
                  <a href="" className='fab fa-twitter mx-2'></a>
                  <a href="" className='fab fa-youtube mx-2'></a>
                  <a href="" className='fab fa-instagram mx-2'></a>
                  <a href="" className='fab fa-tiktok mx-2'></a>
                </li>
                <li>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
