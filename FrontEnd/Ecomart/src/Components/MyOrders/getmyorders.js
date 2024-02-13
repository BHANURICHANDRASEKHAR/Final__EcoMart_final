import { getcookie } from "../../../fetchfunction";
import axios from "axios";

export default function myordersdata(name,setordersdata)
{
    const token=getcookie();
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
