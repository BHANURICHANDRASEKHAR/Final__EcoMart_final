import React,{useState,useEffect} from 'react'
import Left from './left/Left'
import './useraccount.css'
import './common.css'
import Faq from './Right/Faq'
import { useDispatch,useSelector } from 'react-redux' //use dispatch fnction 
import { Outlet,useOutlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import fetchdatafromdatabase from '../../../fetchfunction'
export default function Account() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    fetchdatafromdatabase(...['get', 'https://final-eco-mart-api.vercel.app/user', dispatch, navigate]);
   
  },[])
  const isOutletRendering = useOutlet();
  return (
    <div className="container-fluid m-4 ">
    <div className='grid1'>
    <div className='grid1-itmes'><Left /></div>
    <div className='grid1-itmes bg-light rounded-2' >
    {isOutletRendering ? null : <Faq/>}
    <Outlet/>
    </div>

    </div>
</div>
  )
}
