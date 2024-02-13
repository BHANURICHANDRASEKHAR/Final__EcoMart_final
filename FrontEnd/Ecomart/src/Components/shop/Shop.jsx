import React, { useContext, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import {  Link } from 'react-router-dom';
import AOS from 'aos'
import reacticons from '../../../src/icons';
import Sticky1 from './Sticky1';
import Sticky from './Sticky';
import './shop.css'
import '../../Routers/navbar.css'
import '../../Components/Home/features/features.css'
import Rating from './Rating';
import rawdata from '../../../data/testdata';
import useFunction from '../customs hooks/useFunction';
export default function Shop() {
useEffect(()=>{
    AOS.init();
})
  // State for storing and displaying product data
  const [groupdata, setgroupdata] = useState(rawdata);
const [loader,setloader]=useState(false)
const [addItems]=useFunction();
  // Filtering function based on price
  function fun(filtervalue) {
    const newdata = rawdata.filter((e) => {
      const { price } = e;
      if (filtervalue >= price) {
        return price;
      }
    });
    setgroupdata(newdata);
  }

  // Function to set new data
  function newsetdata(data1) {
    setgroupdata(data1);
  }
 function addToCart (id, productname, price, productimg) {
   addItems([id,productname,price,productimg,setloader])
    }

  return (
    <div className='container-fluid'>
      <div className='rowdata11'>
         <Sticky fun={fun} newsetdata={newsetdata} />
        <div className='col'>
          <div className='main-grid'>
            {groupdata.map((e,index) => {
              return (
             <Cartdata key={index} e={e} addToCart={addToCart} loader={loader}/>
              );
            })}
           
          </div>
        </div>

      </div>
              <Sticky1 fun={fun} newsetdata={newsetdata} />

    </div>
  );
}
export const Cartdata=({e,addToCart,loader})=>{
  const { id, image, name, price } = e;
  return(
    <Card style={{ width: 'auto',height:'370px' }}  
    data-aos='fade-up'
    data-aos-duration='900'
    data-aos-delay=''
    data-aos-easing='ease-in-out'>
    <Card.Img variant="top" src={image} />
  <Card.Body>
  
  <Link to={`/productdetails/${e.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
  
  <div style={{marginLeft:'15px'}}>
  <Card.Title><b>{name}</b></Card.Title>
  <Card.Text>
  <Rating /> <span style={{ margin: '3px' }}>5</span>
  <br />
  <b style={{ marginTop: '10px' }}>Price: {price}</b>
  </Card.Text></div>
  </Link>
  <button
  
  style={{width:'auto'}}
  onClick={(event) => {
    addToCart(id,name, price, image);
  }}
  >
  <reacticons.shopingcart style={{ margin: '10px' }} />
  Add to Cart
  </button>
  </Card.Body>
  
  </Card>
  )
}
