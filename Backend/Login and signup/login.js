const express = require('express');
const { checkperson } = require('./signup');
const bcrypt = require('bcrypt');
const connector = require('../db');
const router = express.Router();
  const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/login', async (req, res) => {
  const data = req.body;
  try {

    const sqldata = await checkperson(data);
    if (!sqldata || sqldata.length == 0) {
      console.log(sqldata)
      res.status(200).json({ status: 'unSuccess', msg: 'User Not Found' });
    }
   else{ const currentdata = sqldata[0];
    const haspassword = currentdata.password;
    const textpassword = data.password;
    // const passswordcompare = await bcrypt.compare(textpassword, haspassword);
    
    if (textpassword===haspassword) {
      const token = signjwt(currentdata);

      res.status(200).json({ status: 'Success', msg: `hello ${currentdata.name}`,token:token });
    } else {
      res.status(500).json({ status: 'unSuccess', msg: 'Password was Incorrect' });
    }}
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ status: 'unSuccess', msg: 'Internal Server Error' });
  }
});

module.exports = router;

function signjwt(reqdata)
{
    const payload={
        email:reqdata.mail
    }

    const data=jwt.sign(payload,process.env.jwt_secretekey,{expiresIn:'1y'});
    console.log(data)
    return data;
}

