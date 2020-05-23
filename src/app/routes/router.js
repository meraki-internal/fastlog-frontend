const { Router } = require('express');

const route = Router();

const user = require('./user.routes');
const auth = require('./auth.routes');

route.get('/', (req, res) => {
  return res.json({ messager: 'Hello,world.' });
});

route.use('/auth', auth);
route.use('/register', user);

module.exports = route;
