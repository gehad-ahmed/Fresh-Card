import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouts({children}) {
    if(!localStorage.getItem("accessToken")){
        return <Navigate to={"/Login"} />
    }
  return (
    <div>
      {children}
    </div>
  )
}
