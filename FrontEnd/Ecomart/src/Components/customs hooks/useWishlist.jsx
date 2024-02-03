import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { notifysuccess } from '../../../tostisy';
import { getcookie } from '../../../fetchfunction';
import { useDispatch } from 'react-redux';
import { WishlistActions } from '../../../Redux-store/Centralstore/wishlist';
function useWishlist() {
    const token=getcookie();
  const dispatch=useDispatch();
 function addItemstoWishList({...data})
 {
    if(token)
    {
        axios.post('https://ecomart-apii.onrender.com/add',data,{
        headers:{'x-token':token}
        })
        .then((res)=>{
           if(res.data.status='Success')
           {
            notifysuccess(toast,res.data.msg)
           }
        })
        .catch(e=>{
            console.log(e.message)
        })
    }
    else{
        navigate('/login')
    }
  
 }
 function fetchwishlistdata()
 {
    if(token)
    {
        axios.get('https://ecomart-apii.onrender.com/wishlist/get',{
        headers:{'x-token':token}
        })
        .then((res)=>{
           if(res.data.status='Success')
           {
            dispatch(WishlistActions.addtowishlist(res.data.data))
           }
        })
        .catch(e=>{
            console.log(e.message)
        })
    }
    else{
        navigate('/login')
    }
 }
 function removeItemstoWishList(id)
 {
  const data={
    id:id
  }
    if(token)
    {
        axios.post('https://ecomart-apii.onrender.com/wishlist/remove',data,{
        headers:{'x-token':token}
        })
        .then((res)=>{
           if(res.data.status='Success')
           {
            fetchwishlistdata();
            notifysuccess(toast,res.data.msg)
           }
        })
        .catch(e=>{
            console.log(e.message)
        })
    }
    else{
        navigate('/login')
    }
  
 }
 return [addItemstoWishList,fetchwishlistdata,removeItemstoWishList];
}

export default useWishlist