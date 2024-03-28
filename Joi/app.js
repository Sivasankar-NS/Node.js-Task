const express = require('express');
const Joi = require('joi');

const app = express();
app.use(express.json()); 
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
function validatePayload(req, res, next) {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
app.post('/register', validatePayload, (req, res) => {
  res.json({ message: 'Registration successful', data: req.body });
});
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
