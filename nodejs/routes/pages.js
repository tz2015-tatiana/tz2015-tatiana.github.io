const express = require('express');
const router = express.Router();

router.get ('/', (req, res) => {
  res.render("register");
});

router.get('/login', (req, res) => {
  res.render("login");
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;