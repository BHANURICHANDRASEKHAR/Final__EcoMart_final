const express=require('express')
const router=express.Router();
const connector=require('../db');
const {tokenverify}=require('../tokenverify_middleware')
router.post('/add',tokenverify,(req,res)=>{
    const {id,image,price,name}=req.body
    console.log(req.body,req.user.email)
    const insertquery=`insert into wishlist values(?,?,?,?,?,?)`
    connector.query(insertquery,[req.user.email,id,image,name,price,true],(err)=>{
        if(err) throw err;
        res.status(200).json({status:'Success',msg:'SuccessFully  Add to wishList'})
    })
})
router.get('/get',tokenverify,(req,res)=>{
 try{
    const email=req.user.email;
    const insertquery=`select * from wishlist where email=(?)`
    connector.query(insertquery,[email],(err,data)=>{
     if(err) throw err;
     res.status(200).json({status:'Success',data:data})
    })
 }
 catch(e)
 {
    console.log(e.message)
 }
})
router.post('/remove',tokenverify,(req,res)=>{
    const email=req.user.email;
  const id=req.body.id
    const deletequery=`delete from wishlist where email=(?) and id=(?)`;
    try{
        connector.query(deletequery,[email,id],(err,datares)=>{
            if(err) throw err;
            res.status(200).json({status:'Success',msg:'Successfully removed'})
        })
 
    }   
    catch(e)
    {
       console.log(e.message) 
    }
})
module.exports=router;
