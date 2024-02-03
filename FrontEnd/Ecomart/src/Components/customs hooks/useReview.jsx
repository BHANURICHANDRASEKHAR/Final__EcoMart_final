import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { getcookie } from '../../../fetchfunction';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';

import { ReviewActions } from '../../../Redux-store/review';
import { notifysuccess } from '../../../tostisy';
function useReview() {
  const data = useSelector((state) => state.reviewslice);

  const dispatch=useDispatch();
  const navigate=useNavigate();
  function Addreviewtodatabase(data){
   
    const token=getcookie();
    if(token)
    {
        axios.post('https://ecomart-apii.onrender.com/add',data,{
        headers:{'x-token':token}
        })
        .then((res)=>{
           if(res.data.status='Success')
           {
            notifysuccess(toast,res.data.msg)
           }
        })
        .catch(e=>{
            console.log(e.message)
        })
    }
    else{
        navigate('/login')
    }
  }
 function fetchReviews(id) {
  axios.get(`https://ecomart-apii.onrender.com/reviews/get?id=${id}`)
    .then((res) => {
      if (res.data.status === 'Success') {
     
        dispatch(ReviewActions.addreview(res.data.data))
      } else {
        throw new Error('Failed to fetch reviews');
      }
    })
    .catch((error) => {
      console.error('Error fetching reviews:', error.message);
      throw error;
    });
}
  return [Addreviewtodatabase,fetchReviews,data];
}

export default useReview