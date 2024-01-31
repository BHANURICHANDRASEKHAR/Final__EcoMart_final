import axios  from "axios";
import { getcookie } from "../../../../../fetchfunction";
const token=getcookie();
function cancelorder(...reasons)
{
    const navigate=reasons[2];
    
    axios.post('http://localhost:5000/orders/cancelorder',reasons,{
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
axios.get(`http://localhost:5000/orders/get?id=${id}`,{
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