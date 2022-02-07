const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

module.exports = {
  async check(req, res) {
    try {
      const user = req.userId;
      return res.status(200).json({
        message: 'Autenticado com sucesso',
        status: true,
        user,
      });
    } catch (err) {
      return res.status(401).json({
        message: 'O usuário não está autenticado.',
        status: false,
      });
    }
  },
  async auth(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user)
      return res
        .status(400)
        .json({ messager: 'Email not found.', code: '4_enf' });

    if (!(await bcrypt.compare(password, user.password)))
      return res
        .status(401)
        .json({ messsager: 'Invalid password.', code: '4_pwd' });

    user.password = undefined;

    return res.send({
      messager: 'Successfully authenticated.',
      code: '2_at',
      token: generateToken({ id: user.id }),
      user: user,
    });
  },
};
