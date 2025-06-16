const UserModel = require('../models/user-model');
const bcryptjs = require('bcryptjs');

async function registerUser(req, res) {
  try {
    const {name, email, password, profilePic} = req.body;

    const checkEmail = await UserModel.findOne({email});

    if (checkEmail) {
      return res.status(400).json({message: 'Users exists', error: true});
    }

    //password to haspassword
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profilePic,
      password: hashPassword,
    };

    const user = new UserModel(payload);
    const savedUser = await user.save();

    return res.status(201).json({
      message: 'User created successfully',
      data: savedUser,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({message: error.message || error, error: true});
  }
}

module.exports = {registerUser};
