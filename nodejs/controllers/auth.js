const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Secret key for JWT
const secretKey = 'your-secret-key';

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
  console.log("login" + req.body);

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
        // Generate a JWT token
        const token = jwt.sign({ userID: user.id, userName: user.name, email: user.email }, secretKey, { expiresIn: '1h' });

        // Send the token to the client, store in cookies
        res.cookie('token', token);

        //res.render('profile', {
          //message: 'Login successful. You can view your profile now',
          //user: user
        //});
        res.redirect('/auth/profile');
      }
  })
};

exports.changeName = (req, res) => {
  const { changeName } = req.body;
  console.log(changeName);

  // Access the token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Unauthorized - Missing token');
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);

    // Assuming the decoded information contains the user ID
    const userID = decoded.userID;

    // Update the user's name in the database
    db.query('UPDATE users SET name = ? WHERE id = ?', [changeName, userID], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      console.log(results);

      // The update was successful, redirect to a profile page with updated name
      res.render('profile', {
        message: 'Name changed successfully',
        user: { name: changeName }
      });
    });
  } catch (error) {
    // Handle token verification errors
    console.error(error);
    res.status(401).send('Unauthorized - Invalid token');
  }
}

exports.profile = (req, res) => {
  console.log("profile" + req.body);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('Unauthorized - Missing token');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userName = decoded.userName;

    res.render('profile', {
      user: { name: userName }
    })
  } catch (error) {
    // Handle token verification errors
    console.error(error);
    res.status(401).send('Unauthorized - Invalid token');
  }
}