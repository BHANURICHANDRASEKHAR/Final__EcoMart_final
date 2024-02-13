import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import React, { useEffect, useState } from 'react'
import { notifyerror } from '../../../tostisy';
import { toast } from 'react-toastify';

export default function Capcha({pay,cuurentstate,itemdata,navigate,}) {
    const [input,setinput]=useState('')
    const [flag,setflag]=useState(false)
useEffect(()=>{
    loadCaptchaEnginge(3); 
},[])
function ChangeHandle(e)
{
    setinput(e.target.value);
}
   function doSubmit()
   {
    
    if (validateCaptcha(input)!=true) {
        notifyerror(toast,'Captcha Does Not Match')
       setinput('')
       setflag(false)
    }
  else{
    setflag(true);

  }
   }
        return (<div>
            <div className="container">
                <div className="form-group">
 
                    <div className="col mt-3">
                        <LoadCanvasTemplate />
                    </div>
 
                    <div className="col mt-3">
                        <div><input placeholder="Enter Captcha Value" value={input} name="user_captcha_input" type="text" onChange={ChangeHandle}></input></div>
                        <div><button className="btn btn-primary" onClick={() =>doSubmit()}>Verify</button></div>
                    </div>
                </div>
 
            </div>
            {
                flag &&  <button  onClick={()=>{pay(cuurentstate,itemdata,navigate)}} >Place Order</button>

            }
        </div>);
 
}
