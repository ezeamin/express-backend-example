import bcrypt from 'bcryptjs';
import HttpStatus from 'http-status-codes';

import UsersModel from '../../../models/UserSchema.js';

export class PutController {
  static async putUser(req, res) {
    const {
      params: { id },
      user,
      body,
    } = req;

    // You can only edit your own profile or, if you are admin, all
    if (id !== user._id && !user.isAdmin) {
      res.status(HttpStatus.FORBIDDEN).json({
        data: null,
        message: 'No tienes permisos para realizar esta acción',
      });
      return;
    }

    // A not admin user can't set itself as one (or try to modify that value)
    if (!user.isAdmin && 'isAdmin' in body) {
      res.status(HttpStatus.FORBIDDEN).json({
        data: null,
        message:
          'No tienes permisos para configurar los usuarios administradores',
      });
      return;
    }

    // Trim body fields
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === 'string') {
        body[key] = body[key].trim();
      }
    });

    if (body.password) {
      const cryptedPassword = bcrypt.hashSync(body.password, 10);
      body.password = cryptedPassword;
    }

    try {
      const action = await UsersModel.updateOne({ _id: id }, body);

      if (action.matchedCount === 0) {
        res.status(HttpStatus.NOT_FOUND).json({
          data: null,
          message: 'Usuario no encontrado',
        });
        return;
      }

      res.json({
        data: null,
        message: 'Usuario actualizado exitosamente',
      });
    } catch (err) {
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
