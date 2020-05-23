const User = require('../models/User');
const { generateToken } = require('../utils/generateToken');

module.exports = {
  async store(req, res) {
    const { name, email, password } = req.body;

    const verify = await User.findOne({ email });

    if (verify)
      return res
        .status(400)
        .json({ messager: 'E-mail already registered', code: '4_er' });

    const data = {
      name,
      email,
      password,
    };

    const user = await User.create(data);
    return res.status(200).json({
      messager: 'Registered successfully.',
      code: '2_rs', 
      user,
      token: generateToken({ id: user.id }),
    });
  },
};