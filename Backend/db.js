const sql=require('mysql')
const dotenv = require('dotenv');
dotenv.config();
const connetor=sql.createConnection({
    host: 'sql12.freemysqlhosting.net',

    user: process.env.db_name,
    password: process.env.db_pass,
    database: process.env.db_name, 
})
connetor.connect((err)=>{
   if(err) console.log(err);
   console.log('connected....!')

})
module.exports=connetor;
