const sql=require('mysql')
const connetor=sql.createConnection({
    host: 'mysql-1c74fdef-boyshostel1148-f80f.a.aivencloud.com',
    port: 18904,
    user: 'avnadmin',
    password: 'AVNS_xWFJEYZbUyXthSQa4C1',
    database: 'Ecomart', 
})
connetor.connect((err)=>{
   if(err) console.log(err);
   console.log('connected....!')

})
module.exports=connetor;
