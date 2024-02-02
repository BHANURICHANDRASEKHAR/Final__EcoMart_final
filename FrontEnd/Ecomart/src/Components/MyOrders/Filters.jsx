import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Filters() {
const navigate=useNavigate();
    const filterslist=['On The Way','Delivered','Cancelled'];
    function check(e)
    {
     
     if(e.target.value=='Cancelled')
     {
    if(e.target.checked)
    {
      navigate('/account/myorders/cancel-orders') 

    }
    else{
      navigate('/account/myorders')  
    }
     }
    }
  return (
    <div className='p-3 myorders-child ' style={{height:'200px'}}  >
    <h4>Filters</h4>
    <h6 className='text-dark'>Order Status</h6>
    {

        filterslist.map((items,index)=>{
        return(
            <div key={index}> <input type='checkbox' className='m-2' value={items} onChange={check} /> &ensp;{items}</div>
        )
        })
    }
    </div>
  )
}
