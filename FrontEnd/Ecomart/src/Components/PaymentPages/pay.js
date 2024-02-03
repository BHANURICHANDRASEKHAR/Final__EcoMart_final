import loadScript from './paymentloader';
import { getcookie } from '../../../fetchfunction';
import axios from 'axios';
const token = getcookie();
console.log('token is the',token)
async function successpayment(...data) {
  const navigate=data[data.length-1];
  axios.post("https://ecomart-apii.onrender.com/payment/success", data, {
    headers: {
      'x-token': token
    }
  }).then(res => {
    const order_id=res.data.order_id;
   navigate(`/orderplaced/${order_id}`)
  }).catch(error => {
    console.error(error);
  });
}

async function pay(cuurentstate, itemdata, navigate) {
  if (cuurentstate === 'Pay Online') {
    try {
      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        console.log('Error at razorpay.com');
      } else {
        const result = await axios.post('https://ecomart-apii.onrender.com/payment/create-order', itemdata);
        if (result) {
          const { amount, id, currency } = result.data;

          const options = {
            key: 'rzp_test_QCqTQQpSTVIb3x',
            amount: amount.toString(),
            currency: currency,
            name: "Ecomart",
            description: "Test Transaction",
            order_id: id,
            handler: function (response) {
              successpayment(itemdata, response,navigate);
            }, 
            prefill: {
              name: "Ecomart",
              email: "bhanurichandu@gmail.com",
              contact: "9999999999",
            },
            notes: {
              address: "Ecomart",
            },
            theme: {
              color: "#61dafb",
            },
          };

          const paymentObject = new window.Razorpay(options);
          paymentObject.open();
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  } else {
   
     
      axios.post('https://ecomart-apii.onrender.com/payment/addcoddata', itemdata,{
        headers: {
          'x-token': token
        }
      }).then(res => {
        const order_id=res.data.order_id;
       navigate(`/orderplaced/${order_id}`)
      }).catch(error => {
        console.error(error);
      });
  }
}

export default pay;
