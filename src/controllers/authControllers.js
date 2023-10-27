import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserDb from '../models/UserSchema.js';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

// ----------------------------
// POST
// ----------------------------

export const postLogin = async (req, res) => {
  const { body } = req;

  try {
    // 1- (Try to) Search user in DB
    const user = await UserDb.findOne({
      username: body.username,
    });

    // 2- Validate credentials
    // Cases:
    // a. incorrect username
    // b. incorrect password (we compare them using bcrypt)
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      res.status(400).json({
        data: null,
        message: 'Usuario o contraseña no valida(s)',
      });
      return;
    }

    // 3- Generate JWT
    // Everything is correct, generate JWT
    // We remove the password from the user object, so that it doesn´t get sent to the FE
    const userInfo = {
      ...user._doc,
      password: undefined,
    };

    // (payload, secretKey, options)
    const token = jwt.sign(userInfo, SECRET_KEY, {
      expiresIn: '1h',
    });

    // 4- Send JWT to FE
    res.json({
      data: token,
      message: 'Login exitoso',
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        data: null,
        message: `ERROR: ${err}`,
      },
    });
  }
};
