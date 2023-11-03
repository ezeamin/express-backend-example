import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UsersModel from '../models/UserSchema.js';

const { JWT_SECRET_KEY } = process.env;

// ----------------------------
// POST
// ----------------------------

export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  try {
    // 1- (Try to) Search user in DB
    const userInDb = await UsersModel.findOne({
      username,
      isActive: true,
    });

    // 2- Validate credentials
    // Cases:
    // a. incorrect username (no user found)
    // b. incorrect password (we compare them using bcrypt)
    if (!userInDb || !bcrypt.compareSync(password, userInDb.password)) {
      res.status(400).json({
        data: null,
        message: 'Usuario o contraseña no valida(s)',
      });
      return;
    }

    // 3- Generate JWT
    // Everything is correct, generate JWT
    // We remove the password and isActive from the user object,
    // so that it doesn´t get sent to the FE
    const userInfo = {
      ...userInDb._doc,
      password: undefined,
      isActive: undefined,
    };

    // (payload, secretKey, options)
    const token = jwt.sign(userInfo, JWT_SECRET_KEY, {
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
