const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ messager: 'Você precisa informar um token' });

  const parts = authHeader.split(' ');
  if (!parts.length === 2)
    return res.status(401).json({ messager: 'Token Error! ' });

  const [schema, token] = parts;

  if (!/^Bearer$/i.test(schema))
    return res
      .status(401)
      .json({ messager: 'Houve uma má formatação no token' });

  jwt.verify(token, authConfig.secret, function (err, decoded) {
    if (err) return res.status(401).json({ messager: 'Token invalido' });

    req.userId = decoded.id;
    return next();
  });
};
