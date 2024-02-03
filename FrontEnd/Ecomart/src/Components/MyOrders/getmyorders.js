import { getcookie } from "../../../fetchfunction";
import axios from "axios";
const token=getcookie();
export default function myordersdata(name,setordersdata)
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
    }
 })
}