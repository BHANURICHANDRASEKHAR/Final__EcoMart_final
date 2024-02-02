import React, { useState,useEffect } from 'react'
import ProductDetails from '../PaymentPages/OrdersPages/ProductDetails';
import { Noresult } from './OrdersMain';
import useSearch from '../customs hooks/useSearch';
function Products({ordersdata}) {
  const [inputdata,setinputdata]=useState('');
  const [itemlist,setitemslist]=useState(ordersdata)
  function seacrhfunction(){
       const searchlist=ordersdata.filter((e)=>{
        const {productname}=e;
         const actualname=productname.match(new RegExp(inputdata, 'i')); 
         return actualname; 
    });  
        return(setitemslist(searchlist));
    }
useEffect(()=>{
  seacrhfunction();
},[inputdata])

  return (
    <div  className='myorders-child' >
     <SearchItems setinputdata={setinputdata} seacrhfunction={seacrhfunction}/>
      <div>
      
        {itemlist.length > 0 ? (
          itemlist.map((items, index) => (
            <div className='p-4 products' key={index}>
              <ProductDetails productdata={items} />
            </div>
          ))
        ) : (
           <Noresult/>
        )}
        
      
      </div>
    </div>
  )
}

export default Products
export const SearchItems=({setinputdata,seacrhfunction})=>{
  return( <div className="container d-flex align-items-center">
  <input type="search" className="search-box" placeholder="Search...for a Item"  onChange={(e)=>{setinputdata(e.target.value)}}/>
  <button className="btn btn-outline-success mb-4" onClick={seacrhfunction}>Search</button>
  
</div>
)
}