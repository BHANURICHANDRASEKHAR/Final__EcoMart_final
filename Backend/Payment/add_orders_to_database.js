const db=require('../db')
 function orderstodatabase(...data){

    const [items,id,email,status]=data;
   console.log(items)
   var date=new Date().toDateString();
   const insertquery=`insert into orders values(?,?,?,?,?,?,?,?)`;
    db.query(insertquery,[email.email,items.image,items.name,items.price,id.razorpay_order_id,date,status.status,'1'],(err,data)=>{
    if(err) throw err;
    return true;
  })
}
module.exports=orderstodatabase;