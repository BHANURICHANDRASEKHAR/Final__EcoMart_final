import React,{useEffect} from 'react'
import Routers from './Routers/Routers'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import {getcookie} from '../fetchfunction';
 import { AuthActions } from '../Redux-store/Centralstore/reduers';
export default function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
 const  token= getcookie();
  if(!token)
  {
    console.log('logout function toen is not found')
  
  }
  else{
    console.log('login funcion')
    dispatch(AuthActions.login())
  }
  })
  return (
    <div>
    <Routers/>
   <ToastContainer/>
    </div>
  )
}
