const express=require('express')
const router=express.Router();
const {tokenverify}=require('../tokenverify_middleware')
const connector=require('../db')
router.post('/add',tokenverify,(req,res)=>{
   
   const email=req.user.email;
   console.log(email);
   const data=req.body;
   const currentDate = new Date();
   const dateString = currentDate.toDateString();
   
   const inserquery=`insert into reviews values(?,?,?,?,?,?,?)`;
   connector.query(inserquery,[email,data.id,data.image,data.comment,data.rating,data.name,dateString],(err,data)=>{
    if(err) throw err;
    res.status(200).json({status:'Success',msg:'Successfully Review Updated'})
   })
})
//get reviews
router.get('/get',(req,res)=>{
   const {id}=req.query;
   try{
    const selectquery=`select * from reviews where id=(?)`;
    connector.query(selectquery,[id],(err,data)=>{
   if(err) 
    res.status(200).json({status:'Success',data:data})
     })
   }
   catch(e)
   {
   
   }
})
module.exports=router;