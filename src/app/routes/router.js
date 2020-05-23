const { Router } = require('express');

const user = require('./user.routes');
const auth = require('./auth.routes');

const route = Router();

route.get('/', (req, res) => res.json({ messager: 'Hello, world' }));
route.use('/user', user);
route.use('/auth', auth);

module.exports = route;