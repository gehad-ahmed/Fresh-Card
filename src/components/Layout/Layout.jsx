import React, { useEffect, useState } from 'react'
import classes from './Layout.module.css'

import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";




export default function Layout() {
    
  return (
    <>
      <Navbar />
      <Outlet />
     
        <div className=" shadow-md border-1 fixed start-6 bottom-6 py-3 px-2">
             <Offline >Plaese Connect Network</Offline>
       </div>

    </>
  )
}
