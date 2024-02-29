const express = require('express');
const router = express.Router();
const users = require('../users')


router.get('/', (req, res) => {
  res.render('index', { users, title : 'Users List' });
});

module.exports = router;
