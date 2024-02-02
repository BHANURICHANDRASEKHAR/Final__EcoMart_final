import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import {getcancelorders} from './cancel_orders'
import { Productdata } from '../ProductDetails';
import { Steps } from 'antd';
export default function CancelSuccess() {
    const {id}=useParams();
    const [canceldata,setcanceldata]=useState([]);
    useEffect(()=>{
    getcancelorders(id,setcanceldata);
 
    },[])
  
    const productdata=canceldata.length>0&&canceldata[0];
  return (
    <div className='container mt-5 p-3' style={{background:'white'}}><CancelOrders productdata={productdata}/></div>
  )
}
export const CancelOrders=({productdata})=>{
    const description=productdata.date
    return(
        <div className='container'>
        <div className='row m-2'>
        <div className='col-sm'><Productdata productdata={productdata}/></div>
        <div className='col-sm'>
        <Steps
        className='mt-3'
        current={1}
        status="error"
        items={[
          {
            title: 'Order Confirmed',
            description,
          },
          {
            title: 'Cancelled',
            description,
          },
         
        ]}
      />    
      <hr/>
      <p style={{fontSize:'14px'}}>You requested a cancellation due to {productdata.reason}</p>
        </div>
        </div>
        </div>
    )
}
