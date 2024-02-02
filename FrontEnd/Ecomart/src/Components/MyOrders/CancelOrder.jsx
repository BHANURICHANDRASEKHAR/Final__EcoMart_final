import React, { useEffect,useState } from 'react'
import myordersdata from './getmyorders'
import {CancelOrders} from '../PaymentPages/OrdersPages/Cancel Orders/CancelSuccess'
import { SearchItems } from './Products';
import seacrhfunction from './searchfunction';
export default function CancelOrder() {
  const [deleteorder,setdeleteorder]=useState([]);
  const [inputdata,setinputdata]=useState('');

  useEffect(()=>{
  myordersdata('cancel_orders',setdeleteorder);
  },[]);
  useEffect(()=>{
    seacrhfunction(deleteorder,inputdata,setdeleteorder);
  },[inputdata])
  
   return (
    <div className='myorders-child'>
    <SearchItems setinputdata={setinputdata} seacrhfunction={seacrhfunction}/>
    <div>{
      deleteorder.map((items,index)=>{
        return(
            <CancelOrders productdata={items} key={index}/>
        )
      })
    }</div>
    </div>
  )
}
