import React, { useState,useEffect } from 'react'
import Filters from './Filters'
import Products from './Products';
import {SearchItems} from './Products'
import { useOutlet,Outlet } from 'react-router-dom'
import './myorders.css'
import Loader from '../../Loader';
import myordersdata from './getmyorders'
export default function OrdersMain() {
    const [tabelname,settablename]=useState('orders');
    const [loader,setloader]=useState(false)
    const [ordersdata,setordersdata]=useState([])
    useEffect(()=>{
        myordersdata(tabelname,setordersdata,setloader); 
    },[tabelname])
    var productdata=ordersdata.length>=0&&ordersdata;
    const isOutletRendering = useOutlet();

  return (
    <div className='container-fluid mt-5 myorders-parent'>
    <Filters/>
    {loader &&<Loader/>}
    {isOutletRendering ? null : (productdata.length <= 0 ? <Noresult /> : <Products ordersdata={ordersdata} />)}
    <Outlet/>
    </div>
  )
}
export const Noresult=()=>{
  return(<div className='noresult p-5'>
  <img src='https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?w=740&t=st=1706689940~exp=1706690540~hmac=06f080e42d22b8497b8e4be8e13027c4611c2f43a46b9e983ff54d3273a20681'/>
  <h4>Sorry, no results found</h4>
  <p>Edit search or go back to My Orders Page</p>
  </div>)
}
