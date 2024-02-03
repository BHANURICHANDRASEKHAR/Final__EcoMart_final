import React, { useEffect, useState } from 'react'
import './input.css'
import { useSelector,useDispatch } from 'react-redux'
import {adduserdata} from '../../Home/login/signupformvalidation'
import axios from 'axios';
import {notifyerror,notifysuccess} from '../../../../tostisy'
import {userdetailsActions} from '../../../../Redux-store/Centralstore/accountslice';
import { ToastContainer,toast } from 'react-toastify';
function UserInfo() {
  const dispatch=useDispatch();
  const userdata=useSelector((state)=>state.userdetaileslice.userdetails);
  console.log(userdata)
    const [edit,setedit]=useState(false)
  const [msg,setmsg]=useState('')
    const [userdetails,setuserdetails]=useState({
        firstname:'',
        lastname:'',
        gender:'',
        email:'',
        phonenumber:'',
        })
        const setuserdata=(e)=>{setuserdetails({...userdetails,[e.target.name]:e.target.value})
        }
  userdetails.email= userdata.length > 0 ? userdata[0].email : '';

useEffect(()=>{
  userdetails.firstname= userdata.length > 0 ? userdata[0].firstname : '';
  userdetails.lastname= userdata.length > 0 ? userdata[0].lastname : '';
  userdetails.phonenumber=userdata.length> 0 ? userdata[0].phnumber:'';
  console.log('page rendered in user info page')
},[userdata ])
function submit()
{
  const validation=adduserdata(userdetails,setmsg)
  if(validation)
  {
  axios.post('hhttps://ecomart-apii.onrender.com/adduserdata',userdetails)
  .then((res)=>{
      if(res.data.status='Success')
      {
        dispatch(userdetailsActions.adduserdetails(res.data.data));
        notifysuccess(toast,"SuccessFully Updated");

      }
    
  })
 
  }
  else{
    notifyerror(toast,msg)
  }
}
function editFun()
{
    setedit(!edit)
}
  return (
    <div className='id' data-aos="fade-down"
    data-aos-duration="900" data-aos-delay='' data-aos-easing='ease-in-out'>
      <h3 style={{width:'maxContent'}}>
        Personal Information <span onClick={editFun} style={{marginLeft:'10px',color:'blue',fontWeight:"500",fontSize:'16px'}}>{edit ? <span>Cancel</span> : <span>Edit</span>}</span>

         </h3>
        
     <div className='input' >
     <label>firstname</label>
       <input
         type="text"
         id="userInfoInput"
        value={userdetails.firstname}
         name='firstname'
         disabled={!edit}
         onChange={setuserdata}
       />
       
     <label>lastname</label>
     <input
       type="text"
       id="userInfoInput"
      value={userdetails.lastname}  
       name='lastname'
       disabled={!edit}
       onChange={setuserdata}
     />
       
  
    </div>
      <div className='input'>
      <label>Gender</label><br/>
      <input type="radio"  name='gender' value="male" disabled={!edit}  onChange={setuserdata}/><label>Male</label><br/>
      <input type="radio"  name='gender' value="female" disabled={!edit}  onChange={setuserdata}/><label>FeMale</label><br/>
      <input type="radio"  name='gender' value="orthers" disabled={!edit}  onChange={setuserdata}/><label>Orthers</label><br/>
      </div>
   <div className='input'>
  <label >Email</label>
   <br/>
   <input
   type="mail"
   id="userInfoInput"
  onChange={setuserdata}
   name='email'
   disabled
   value={userdetails.email}
 /> 
    </div>
    <div className='input'>
    <label >Phone number</label>
     <br/>
     <input
     type="text"
     id="userInfoInput"
   
     name='phonenumber'
    value={userdetails.phonenumber}
     disabled={!edit}
      onChange={setuserdata}
   />    
      </div>
      {edit && <button onClick={submit}>Save</button>}
      <ToastContainer/>
      </div>
    
  );  
}

export default UserInfo;