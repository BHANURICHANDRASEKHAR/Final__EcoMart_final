import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {AddressActions} from '../../../Redux-store/Centralstore/useraddressslice'
import { getcookie } from '../../../fetchfunction';
import axios from 'axios';
export default function useAdress() {
const dispatch=useDispatch();
const addresslist=useSelector(state=>state.useraddressslice)
function getUserAddress()
{
  const token=getcookie();
  axios.get('https://final-eco-mart-api.vercel.app/getuseraddress',{
    headers:{'x-token':token}
  })
  .then((res)=>{
    if(res.data.status=='Success')
    {
      dispatch(AddressActions.addaddress(res.data.data))

    }
  })
  .catch(e=>{
    console.log(e.message)
  })

}
function removeuseraddress(data)
{
  axios.put('https://final-eco-mart-api.vercel.app/deleteuseraddress',data)
  .then((res)=>{
    if(res.data.status=='Success')
    {
      dispatch(AddressActions.addaddress(res.data.data))

    }
  })
  .catch(e=>{
    console.log(e.message)
  })
  // dispatch(AddressActions.removeaddress(data))
}

  return [getUserAddress,removeuseraddress,addresslist]
}
