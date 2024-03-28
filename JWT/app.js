const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
mongoose.connect('mongodb://127.0.0.1:27017/jwttoken')
  .then(() => {
    console.log('DB connection successful');
  })
  .catch(() => {
    console.log('DB not connected');
  });
const schema = require('./schema');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const secretKey = 'asdfghjklzxcvbnm';
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    console.log(req.user = decoded);
    next();
  });
};
app.post('/signup', async (req, res) => {
  const data = new schema({
    ...req.body,
  });
  const { Email } = req.body;
  const existingUser = await schema.findOne({ Email });
  if (existingUser) {
    return res.json({ error: 'Email already exists' });
  }
  await data.save();
  res.json(data);
});
app.post('/login', async (req, res) => {
  const { Email, Password } = req.body;
  const user = await schema.findOne({ Email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid email' });
  }
  if (Password !== user.Password) {
    return res.json({ message: 'Invalid password' });
  }
  const token = jwt.sign({ id: user._id }, secretKey, {
    expiresIn: '1h',
  });
  res.cookie('jwt', token, { httpOnly: true });
  res.json({ message: 'Login successful', user, token });
});
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'I am a protected route' });
});
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
