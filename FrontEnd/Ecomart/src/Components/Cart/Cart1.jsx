import React, { useEffect,useRef} from 'react'
import useFunction from '../customs hooks/useFunction';
import { useSelector,useDispatch } from 'react-redux';
import CartItems from './CartItems';
import fetchcartdatafromdatabase from './fetchcartdata'
import Freeshoping from './Freeshoping'; // free shoping component
import { useNavigate } from 'react-router-dom';
import Pricedetailes from './Pricedetailes';
export default function Cart1() {
const navigate=useNavigate();
 const [addItems, removeItems,cartdata,removeentireItem]=useFunction();
 
const item = cartdata.itemslist;
const count = cartdata.totalprice;
const dispatch = useDispatch();

useEffect(() => {
  fetchcartdatafromdatabase(dispatch, navigate);
}, []);

const confirm = (id,setloader) => {
  removeentireItem(id,setloader)
};
    return(
        <React.Fragment>
 
        <h2>Cart</h2>
        <div className='cart-parent'>
         <div className='cart-child'>
         <CartItems item={item} confirm={confirm}/>
         </div>
         <div className='cart-child' >
         <Pricedetailes totalitemscost={cartdata.totalprice}  delivarycharge={cartdata.deliverycharge}/>
        </div>
        </div>
     <Freeshoping/>
        </React.Fragment>
      )
}
