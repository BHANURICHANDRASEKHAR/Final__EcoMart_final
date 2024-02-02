import axios from "axios";
import { getcookie } from "../../../fetchfunction";

export default async function getorderdata(id) {
    const token = getcookie();
    try {
        const response = await axios.get(`https://final-eco-mart-api.vercel.app/payment/getorderdata?id=${id}`, {
            headers: { 'x-token': token }
        });

     
        return response.data.data;
    } catch (err) {
        console.error(err.message);
       
        throw err;
    }
}
