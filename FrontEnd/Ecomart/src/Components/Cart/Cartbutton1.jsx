import React, { useState } from 'react'
import useFunction from '../customs hooks/useFunction'
import Loader from '../../Loader';
function Cartbutton1({item}) {
    const [addItems, removeItems]=useFunction();
    const[loader,setloader]=useState(false)
    const {productname,quantity,price,productimg,id} = item;

  return (
    <React.Fragment>
   
    <div className="prdct-qty-container ">
    <button className='prdct-qty-btn' type='button' onClick={() => { removeItems(item,setloader) }}>
     -
    </button>
    <input type="text" className='qty-input-box mt-3' value={quantity || 0}  disabled name="" id="" />    {loader&&<Loader/>}

    <button className='prdct-qty-btn' type='button' onClick={() => { addItems([id, productname, price, productimg,setloader]) }}>
     +
    </button>
  </div>
 
    </React.Fragment>
  )
}

export default Cartbutton1