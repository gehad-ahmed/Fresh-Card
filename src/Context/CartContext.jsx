import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export const CartContext =createContext()

export default function CartContextProvider({children}){

const [cart, setCart] = useState(null)
const [ cartId, setCartId] = useState(null)

const headers={
    token:localStorage.getItem("accessToken"),
};
const endPoint=`https://ecommerce.routemisr.com/api/v1/cart`;

async function getWishList(){
      
    try {
     let {data}=  await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
     console.log("",data)
        
         return data
     
  
    } catch (error) {
     console.log(error)
     return error;
    }
 
   }

async function addToWishlist(id){
   console.log(id)

 try {
   let {data}=  await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers})
 console.log(data)
 return data

 } catch (error) {
   console.log(error)
 }
 
 }

async function removeFromWishlist(id){
    console.log(id)
    try {
        let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
        console.log(data)
        return data;
    } 

    catch (error) {
        console.log(error)
    }
}
    
   async function getCart () {
    

       try {
        const {data} =await axios.get(endPoint,{headers})

        return data
       } catch (error) {
        
        console.log(error)
        return error;
       }
    }


    async function addToCart(productId){
        try {
       const {data}= await axios.post(endPoint,{productId},{headers})
         
            return data;
        } catch (error) {
            console.log(error)
            return error.response.data.message
        }

    }


     
    async function updateProduct(prodId,count){
        try {
       const {data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{count:count},{headers})
  
            return data;
        } catch (error) {
            console.log(error)
            return error.response.data.message
        }

    }

    async function deleteProduct(prodId){
        try {
       const {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{headers})
            return data;
        } 
        catch (error) {
            console.log(error)
            return error.response.data.message
        }

    }


    async function deleteAllProducts(){
        try {
       const {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
            return data;
        } 
        catch (error) {
            console.log(error)
            return error.response.data.message
        }

    }


    async function checkoutCart(cartId,url,formVal){
        try {
       const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{shippingAddress:formVal},{headers})
            return data;
        } catch (error) {
            console.log(error)
            return error.response.data.message
        }

    }


    async function getAllItems() {
        let res= await getCart()
        setCartId(res?.data._id)
        setCart(res)
    }



    useEffect(()=>{
        getAllItems()
    },[])
    return (
        
        <CartContext.Provider value={{addToWishlist,getWishList, removeFromWishlist, addToCart ,getCart,  deleteAllProducts , updateProduct , deleteProduct , checkoutCart ,cart, setCart , cartId, setCartId}}>

            {children}
          
        </CartContext.Provider>
    )
}