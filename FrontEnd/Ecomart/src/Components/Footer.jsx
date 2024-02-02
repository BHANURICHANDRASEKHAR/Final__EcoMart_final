import React from 'react';
import { Link } from 'react-router-dom'
import './footer.css'
import reacticons,{images} from '../icons';
export default function Footer() {
  return (
    <React.Fragment>
  
 <footer className="footer-distributed container">
 
       <div className="footer-left">
 
       
         <img src={images.logo} style={{width:'200px',height:'130px',margin:'0'}}/>
         <p className="footer-links">
         <Link to='/'>Home</Link>
         <Link to='/account'>Account</Link>
         <Link to='/shop'>Shop</Link>
         <Link to='/cart'>Cart</Link>
         </p>
 
         <p className="footer-company-name">Ecomart © 2023</p>
       </div>
 
       <div className="footer-center">
 
         <div>
           <i className="fa fa-map-marker"></i>
           <p><span>dhiwancheruvu</span>rajahmundry,ap</p>
         </div>
 
         <div>
           <i className="fa fa-phone"></i>
           <p>+919885465280</p>
         </div>
 
         <div>
           <i className="fa fa-envelope"></i>
           <p><a href="mailto:support@company.com">bhanurichandu@gmail.com</a></p>
         </div>
 
       </div>
 
       <div className="footer-right">
 
         <p className="footer-company-about">
           <span>About the company</span>
           Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.
         </p>
 
         <div className="footer-icons">
 
           <a href="#"><reacticons.facebook/></a>
           <a href="#"><reacticons.facebook/></a>
           <a href="#"><reacticons.linkedin/></a>
           <a href="#"><reacticons.github/></a>
 
         </div>
 
       </div>
 <div className='paymentlogos'>
 <img src={images.payp}></img>
 <img src={images.pp}></img>
 <img src={images.sc}></img>
 
 
 </div>
     </footer>
    </React.Fragment>
   )
}
