import { getcookie } from "../../../fetchfunction";
import axios from "axios";
const token=getcookie();
export default function myordersdata(name,setordersdata,setloader)
{
    axios.get(`https://ecomart-apii.onrender.com/myorders/get?tablename=${name}`,{
        headers:{
            'x-token':token,
        }
    })
 .then(res=>{
    if(res.data.status=='Success')
    {
        setordersdata(res.data.data)
        setloader(false)
    }
 })
 .catch(err=>{
   console.log(err.message);
   setloader(false)
 })
}
