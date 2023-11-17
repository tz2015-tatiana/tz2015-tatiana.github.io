const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

exports.register = (req, res) => {
  console.log(req.body);

  const {name, email, password, passwordConfirm} = req.body;

  db.query('SELECT email FROM users WHERE email = ?', [email], async (err, results) => {
    if(err) {
      console.log(err);
      return res.status(500).send('Internal Server Error'); //opt
    }

    if(results.length > 0) {
      return res.render('register', {
        message: 'This email is already taken'
      });
    } else if (password !== passwordConfirm) {
      return res.render('register', {
        message: 'Passwords do not match'
      });
    }

    let hashedPassword = await bcrypt.hash(password, 8); //hash 8 rounds
    console.log(hashedPassword);

    db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword}, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error');  //opt
      } else {
        console.log(results);
        return res.render('register', {
          message: 'User is registered. You can log in now'
        });
      }
    })
  });
};

exports.login = (req, res) => {
  console.log(req.body);

  const {email, password} = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
      if(err) {
        console.log(err);
      }

      if (results.length === 0) {
        return res.render('login', {
          message: 'Invalid email'
        });
      }

      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if(!isPasswordValid) {
        return res.render('login', {
          message: 'Invalid password'
        });
      } else {
        res.render('profile', {
          message: 'Login successful',
          user: user
        });
      }
  })
};