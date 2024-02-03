const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { promisify } = require('util');
const connetor = require('../db');

router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    // const hashedData = await hashpass(data);
    const existingPerson = await InsertDataIntoDatase(data);

    if (existingPerson) {
      res.status(200).json({ status: 'Success' });
    } else {
      res.status(200).json({ status: 'Unsuccessful' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'Error' });
  }
});

// async function hashpass(data) {
//   try {
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(data.password, salt);
//     data.password = hashPassword;
//     return data;
//   } catch (e) {
//     console.error('Error occurred at hashing password:', e);
//     throw e;
//   }
// }

async function InsertDataIntoDatase(data) {
  try {
    const check = await checkperson(data);

    if (check.length === 0) {
      const insertQuery = 'INSERT INTO users (name, mail, password, phnumber) VALUES (?, ?, ?, ?)';
      const query = promisify(connetor.query).bind(connetor);

      const result = await query(insertQuery, [data.name, data.email, data.password, data.phnumber]);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error occurred during database insertion:', error);
    return false;
  }
}

async function checkperson(data) {
  console.log(data)
  try {
    const checkQuery = 'SELECT * FROM users WHERE mail = ?';
    const query = promisify(connetor.query).bind(connetor);
    const result = await query(checkQuery, [data.email]);
    return result;
  } catch (error) {
    console.error('Error occurred during database query:', error);
    throw error;
  }
}

module.exports = router;
module.exports.checkperson=checkperson;
