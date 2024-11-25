const jwt = require('jsonwebtoken');
require('dotenv').config();

function tokenverify(req, res, next) {

  var token = req.header('x-token');
  try {
    if (!token) {
     
      return res.status(401).json({ message: 'Login is required' });
      
    }
    const payload = jwt.verify(token, process.env.jwt_secretekey);
    req.user = payload;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ status: 'UnSuccess', msg: 'user not logged in' });
  }
}

module.exports.tokenverify = tokenverify;
