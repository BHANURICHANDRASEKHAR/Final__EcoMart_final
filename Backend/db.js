const sql=require('mysql')
const connetor=sql.createConnection({
    host: 'localhost',

    user: 'root',
    password: 'Chandu@1148',
    database: 'ecomart', 
})
connetor.connect((err)=>{
   if(err) console.log(err);
   console.log('connected....!')

})
module.exports=connetor;
