import React, { useEffect, useState } from 'react'
import useFunction from '../customs hooks/useFunction';
import useWishlist from '../customs hooks/useWishlist';
import reacticons from '../../icons';
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function DeepDetails({items}) {
  const {id,name, price, image}=items;
  const [addItems]=useFunction();
  return (
    <div className='container m-1'> <AddtoWishlist items={items}/> <h2>{name}</h2>
    <p><b>Price:&ensp;</b><del>₹{price+30}</del><b style={{color:'green'}}>&ensp;₹{price}</b></p>
    <div className='w-100'> <p className='productdata'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisl tortor, lobortis non tortor sit amet, iaculis rhoncus ipsum. Fusce ornare nunc maximus dui molestie.</p></div>
    <p>
    Availability:<b style={{color:'green'}}>100 in Stock</b></p>
  <div className='d-grid place-items-center m-4'>  <button onClick={()=>{addItems([id,name, price, image])}}>Add To Cart</button>
  <Link to={`/payment/${id}`}><button style={{backgroundColor:'#ffb240',color:'black'}} >Buy Now</button></Link></div>
   </div>

  )
}
 function AddtoWishlist({items}) {
  const wishlistdata=useSelector((state)=>state.wishlistslice.wishlist);
   const [addItemstoWishList,fetchwishlistdata,removeItemstoWishList]=useWishlist();
  const [wishlist,setwishlist]=useState(false)
  useEffect(()=>{
    fetchwishlistdata();
    console.log("id:",items.id,"wishlistdata:",wishlistdata)
    const presentdata=wishlistdata.find((data)=>data.id==items.id)
    console.log('data page reload',presentdata)

    if(presentdata)
    {
      
     setwishlist(presentdata.status)
    }
    else{
     

      setwishlist(false)
    }
  },[wishlistdata.length,items.id])
  function wishlistfun()
  {
   if(!wishlist)
   {
    setwishlist(true)
    addItemstoWishList(items);
   }
   else{
    removeItemstoWishList(items.id)
     setwishlist(false)
   }
  }
  const style={
    color:wishlist ? 'red' :'black'
  }
  return (
 <React.Fragment>
 {
  wishlist ? <reacticons.heart className='love' style={style} onClick={wishlistfun}/> : <reacticons.heartbroken className='love' style={style} onClick={wishlistfun}/>
}
 </React.Fragment>
  )
}
