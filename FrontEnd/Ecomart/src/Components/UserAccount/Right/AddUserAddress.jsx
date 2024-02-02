import React,{useState,useEffect  } from 'react'
import './input.css'
import UserAddress from './UserAddress'
import useAdress from '../../customs hooks/useAdress';
import { ToastContainer,toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import {notifyerror,notifysuccess} from '../../../../tostisy'
import {userdetailsActions} from '../../../../Redux-store/Centralstore/accountslice';
import {addressvalidation} from '../../Home/login/signupformvalidation';
import Statedata from './Statedata';
import { Cascader } from 'antd';
import axios from 'axios';
export default function AddUserAddress() {
  const userdata=useSelector((state)=>state.userdetaileslice.userdetails);
  const no_ofaddress=useSelector((state)=>state.useraddressslice.no_ofaddress);
  const [count,setcount]=useState(no_ofaddress)
    const [error,setError]=useState('');
    const [edit,setEdit]=useState(false)
    const [values, setValues] = useState({
        name:'',
        email:'',
        number:'',
        pincode:'',
        address: '',
        city: '',
        state: '',
        landmark: '',
        addtype:'',
    
      });
      values.email=userdata.length > 0 ? userdata[0].email : '';

      const changeHandler = (event) => {  
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value
        });
      };
      
      function show() {
        setEdit(prev=>!prev);
      }
      const submit = async(event) => {
        event.preventDefault();
      
        const flag =await addressvalidation(values, setError);
      
        if (flag) {
          axios.post('http://localhost:5000/useraddress', values)
            .then(res => {
              if (res.data.status === 'Success') {
                notifysuccess(toast, 'Successfully Updated');
                setcount(prev => prev + 1);
              } else {
                notifyerror(toast, 'Your address is already present in our database');
              }
            })
            .catch(e => {
              console.log(e.message);
              notifyerror(toast, 'Error updating address');
            });
        } else {
          // Move the console.log statement inside the else block
  
          notifyerror(toast, error);
        }
      };
      
      const changeHandler1 = (value) => {
        setValues({ ...values, state: value[0] });
      };
    return (
        <div className='id'>
      
        <React.Fragment>
        <h3>Manage Address</h3>
        <p
          style={{
            border: '1px solid skyblue',
            height: '36px',
            fontSize: '18px',
            paddingLeft: '10px',
            color: 'blue'
          }}
          onClick={show}
        >
         {edit ? '- Hide Content' : ' + Add New Address'}
        </p>
        {edit && (
          <React.Fragment >
            <div className='input'>
              <input
                type="mail"
                name='mail'
                disabled
                value={values.email}
              />
              <input
                type="text"
                placeholder='Enter name'
                name='name'
                onChange={changeHandler}
              />
            </div>
            <div className='input'>
              <input
                type="text"
                placeholder='pincode'
                name='pincode'
                onChange={changeHandler}
              />
             
            </div>
            <div className='input' style={{ marginTop: '30px' }}>
              <label>Address</label>
              <br />
              <input
                type="text"
                placeholder='address'
                style={{ width: '62.5%', height: '10vh' }}
                name='address'
                onChange={changeHandler}
              />
            </div>
            <div className='input'>
              <input
                type="text"
                placeholder='city/town'
                name='city'
                onChange={changeHandler}
              />
              <Cascader options={Statedata} placeholder='Select a State' onChange={changeHandler1} name='state'/>
              </div>
            <div className='input'>
              <input
                type="text"
                placeholder='landmark(optional)'
                name='landmark'
                onChange={changeHandler}
              />
              <input
                type="number"
                placeholder='phone number'
                name='number'
                onChange={changeHandler}
              />
              </div>
              <div className='input'>
              <label>Address Type</label><br/><br/>
              <input type="radio"  name='addtype' value="Home"  onChange={changeHandler}/><label>Home</label>
              <input type="radio"  name='addtype' value="Office"  onChange={changeHandler}/><label>Office</label>
               </div>
               
            <button type="button" onClick={submit} style={{marginBottom:"20px"}}>
              Save
            </button>
            <button type="button" onClick={() => setEdit(false)}>
              Cancel
            </button>
          </React.Fragment>
        )}
        </React.Fragment>
        <UserAddress  count={count} />
          <ToastContainer/>
        </div>
      );
    };

