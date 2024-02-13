import React from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../Redux-store/Centralstore/cart-slice';
import { useSelector } from 'react-redux';
import { getcookie } from '../../../fetchfunction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function useFunction() {
  const dispatch = useDispatch();
const cartdata=useSelector(state=>state.cartslice);
const navigate=useNavigate();

  function addItems(data) {
   
    const [id,productname,price,productimg,setloader]=data;
  const data1=[{
    productimg:productimg,
    id:id,
    price:price,
    productname:productname,
    
}]

    const token=getcookie();
    if(token)
    {
      setloader(true)
      axios.post('https://ecomart-apii.onrender.com/addtocart',data1,{
        headers: { 'x-token': token }
      })

      .then((res)=>{
        if(res.data.status=='Success')
        { 
          
          dispatch(cartActions.addtocart(res.data.data))
          setloader(false)

        }
      })
   .catch((e)=>{
    setloader(false)
    console.log(e.message)
   })
    }
    else{
      navigate('/login')
    }
  }
  
  function removeItems(data,setloader) {

   const token=getcookie();
   if(token)
   {
    setloader(true)
    axios.post('https://ecomart-apii.onrender.com/removetocart',data,{
      headers:{'x-token':token}
    })
    .then((res)=>{
     if(res.data.status=='Success')
     {
     
      dispatch(cartActions.removecart(res.data.data))
      setloader(false)
     }
    })
    .catch((error) => {
      setloader(false)
      console.error('Error:', error.message);
    });
   }
   else{
    navigate('/login')
   }
  }
  function removeentireItem(id,setloader)
  {
    const data={id:id}
    const token=getcookie();
    setloader(true)
    axios.put('https://ecomart-apii.onrender.com/removeitemfromcart',data,{
      headers:{'x-token':token}
    })
    .then((res)=>{
     if(res.data.status=='Success')
     {
      
      dispatch(cartActions.datapush(res.data.data))
      setloader(false)
     }
    })
    .catch((error) => {
      setloader(false)

      console.error('Error:', error.message);
    });
  }

  return [addItems, removeItems,cartdata,removeentireItem];
}

export default useFunction;


// const addToCart = (event,id, productname, price, productimg) => {
//   event.preventDefault();
//     const values = [
//       {

//         id: id,
//         productname: productname,
//         price: price,
//         productimg: productimg,
      
//       },

//     ];
//     const token=getcookie();
//     if(token)
//     {
//       axios.post('http://localhost:5000/addtocart',values,{
//         headers: { 'x-token': token }
//       })

//       .then((res)=>{
//         if(res.data.status=='Success')
//         {  
//           dispatch(cartActions.addtocart(res.data.data))

//         }
//       })
//    .catch((e)=>{
//     console.log(e.message)
//    })
//     }
//     else{
//       navigate('/login')
//     }
   
//   }