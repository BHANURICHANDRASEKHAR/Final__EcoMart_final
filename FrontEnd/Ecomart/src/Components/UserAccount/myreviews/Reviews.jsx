import React,{useState,useEffect} from 'react'
import myordersdata from '../../MyOrders/getmyorders';
import {ProductReviews} from '../../Product details/CustomerReview'
export default function Reviews() {
    const [reviewdata,setreviewdata]=useState([])
    useEffect(()=>{
        myordersdata('reviews',setreviewdata)
    },[])
    console.log(reviewdata);
  return (
     <ProductReviews reviewdata={reviewdata}/>
  )
}
