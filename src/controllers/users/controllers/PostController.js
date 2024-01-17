import bcrypt from 'bcryptjs';
import HttpStatus from 'http-status-codes';

import UsersModel from '../../../models/UserSchema.js';

export class PostController {
  static async postUser(req, res) {
    const { body } = req;

    const cryptedPassword = bcrypt.hashSync(body.password.trim(), 10);

    const newUser = new UsersModel({
      firstname: body.firstname.trim(),
      lastname: body.lastname.trim(),
      username: body.username.trim(),
      password: cryptedPassword,
      isActive: true,
      isAdmin: false,
    });

    try {
      await newUser.save();

      res.json({
        data: null,
        message: 'Usuario creado exitosamente',
      });
    } catch (err) {
      console.error('🟥', err);

      if (err.message.includes('duplicate')) {
        res.status(HttpStatus.BAD_REQUEST).json({
          data: null,
          message: `El usuario con username "${body.username}" ya existe`,
        });
        return;
      }

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: {
          data: null,
          message: `ERROR: ${err}`,
        },
      });
    }
  }
}
