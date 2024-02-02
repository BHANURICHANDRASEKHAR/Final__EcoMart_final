import axios from "axios";
import { getcookie } from "../../../fetchfunction";
import {notifyerror} from '../../../tostisy'
import { toast } from "react-toastify";
import { cartActions } from "../../../Redux-store/Centralstore/cart-slice";
export default function fetchcartdatafromdatabase(dispatch,navigate) {
    const token = getcookie();
    
   if(token)
   {
    axios.get('https://final-eco-mart-api.vercel.app/cartdata', {
        headers: { 'x-token': token }
    })
    .then((res) => {
        dispatch(cartActions.datapush(res.data.data))
    })
    .catch((e) => {
        console.log('error', e);
    });
   }
   else{
    notifyerror(toast,'please login...')
    navigate('/login')
   }
}
