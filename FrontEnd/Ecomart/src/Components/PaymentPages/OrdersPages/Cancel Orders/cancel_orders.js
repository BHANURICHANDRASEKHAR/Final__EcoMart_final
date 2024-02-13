import axios  from "axios";
import { getcookie } from "../../../../../fetchfunction";

function cancelorder(...reasons)
{
    const navigate=reasons[2];
    const token=getcookie();
    axios.post('https://ecomart-apii.onrender.com/orders/cancelorder',reasons,{
    headers:{
        'x-token':token
    }})
    .then((res)=>{
       if(res.data.status=='Success')
       {
       navigate(`/order-Canceled/${reasons[1].order_id}`)
       }
    })
    .catch(err=>{
        console.error(err.message);
    })

}
export default cancelorder;
export function getcancelorders(id,setcanceldata){
    const token=getcookie();
axios.get(`https://ecomart-apii.onrender.com/orders/get?id=${id}`,{
    headers:{
        'x-token':token
    }})
    .then(res=>{
        if(res.data.status=='Success')
        {
            setcanceldata(res.data.data)
        }
    })
    .catch(err=>{
        console.log(err.message)
    })

}
