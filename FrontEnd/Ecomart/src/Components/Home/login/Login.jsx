import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you are using React Router
import img from '../../../assets/imgs/171.png'
import './login.css'
import img1 from '../../../../public/login.svg'
import { ToastContainer, toast } from 'react-toastify';
import { notifysuccess,notifyerror } from '../../../../tostisy';
import axios from 'axios';
import { loginvalidate } from './signupformvalidation';
import Cookies from 'js-cookie';
import {AuthActions} from '../../../../Redux-store/Centralstore/reduers'
import { useSelector,useDispatch } from 'react-redux';

export default function Login() {
  const navigate=useNavigate() //navigate function 
  const dispatch=useDispatch();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

const [msg,setError]=useState()
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();
   if(loginvalidate(values,setError))
   {
    axios.post('https://final-eco-mart-api.vercel.app/login',values)
    .then((res)=>{
        if(res.data.status=='Success')
        {
          Cookies.set('user',res.data.token)
          notifysuccess(toast,res.data.msg)
          
          dispatch(AuthActions.login());
           navigate('/')
        }
        else{
          notifyerror(toast,res.data.msg)
        }
    })
    .catch((err)=>{
      console.log('error occured')
    })
   }
   else{
    notifyerror(toast,msg)
  }
  };

  return (
    <React.Fragment>
      <div className='center_login'>
        <div className='login-grid'>
          <div className='login_grid_item'>
            <img src={img} className='login-grid-item-img' alt="Login Image" />
          </div>
          <div className='login_grid-item'>
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>

              <div className="row1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  autoComplete="off"
                  placeholder="email@example.com"
                  value={values.email}
                  onChange={handleChange}
                />
              </div>

              <div className="row1">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className='login_button'>Submit</button>

              <Link to='/signup' style={{ textDecoration: 'none',outline:'none' }}>
                <button className='donthaveaccount'>Don't have any account</button><br />
              </Link>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </React.Fragment>
  );
}
