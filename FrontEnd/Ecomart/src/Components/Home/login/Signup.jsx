import React, { useState } from 'react';
import './signup.css';
import img1 from '../../../assets/imgs/sign-up.png'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import validateForm from './signupformvalidation';
import { ToastContainer, toast } from 'react-toastify';
import { notifysuccess,notifyerror } from '../../../../tostisy';
export default function Signup() {
  const navigate = useNavigate();
  const [error,setError]=useState('')

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    phnumber: '',
    repassword:'',

  });

  axios.defaults.withCredentials = true;

  const submit = (event) => {
    event.preventDefault();
    if(validateForm(values,setError))
    {
      axios.post('https://final-eco-mart-api.vercel.app/signup', values)
      .then((res) => {
        if (res.data.status === 'Success') {
          navigate('/login');
        } else {
          setError('person already existed Please login ');
          notifyerror(toast,error)
        }
      })
      .catch((err) => {
        console.log('unsuccess', err);
      });
    } else{
      notifyerror(toast,error)
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <React.Fragment>
      <div
        className='center_signup'
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: '78%',
          height: '50vh',
        }}
      >
        <div className='signup-grid'>
          <div className='signup_grid_item'>
            <img src={img1} className='signup-grid-item-img'  alt='Signup' />
          </div>
          <div className='signup_grid-item'>
            <form>
              <h2>Signup</h2>
              <div className='row1'>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  name='name'
                  autoComplete='off'
                  placeholder='Enter your name'
                  onChange={handleChange}
                />
              </div>
              <div className='row1'>
                <label htmlFor='email'>Email</label>
                <input
                  type='email'
                  name='email'
                  autoComplete='off'
                  placeholder='email@example.com'
                  onChange={handleChange}
                />
              </div>
              <div className='row1'>
                <label htmlFor='phnumber'>Number</label>
                <input
                  type='number'
                  name='phnumber'
                  onChange={handleChange}
                />
              </div>
              <div className='row1'>
                <label htmlFor='password'>Password</label>
                <input
                  type='password'
                  name='password'
                  onChange={handleChange}
                />
              </div>
              <div className='row1'>
                <label htmlFor='repassword'>Re-enter Password</label>
                <input
                  type='password'
                  name='repassword'
                  onChange={handleChange}
                />
              </div>
              <button
                type='submit'
                className='signup_button'
                onClick={submit}
              >
                Submit
              </button>
              <Link to='/login' style={{ textDecoration: 'none' }}>
                <button className='donthaveaccount'>
                  Already have an account
                </button>
                <br />
              </Link>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </React.Fragment>
  );
}
