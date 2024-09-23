import axios from "axios";
import { createContext } from "react";

export const wishlistContext= createContext()

export default function wishlistContextProvider({children}){
    const headers={
        token:localStorage.getItem("accessToken"),
    };
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

    async function addProductToWishlist(id){
        console.log(id)
     
      try {
        let {data}=  await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers})
      console.log(data)
      return data
    //   setShowing(!showing)
      } catch (error) {
        console.log(error)
      }
      
      }

    return (
        <wishlistContext.Provider value={{getWishList,addProductToWishlist}}>

            {children}
          
        </wishlistContext.Provider>
    )
}
