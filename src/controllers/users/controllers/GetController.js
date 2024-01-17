import HttpStatus from 'http-status-codes';

import UsersModel from '../../../models/UserSchema.js';

export class GetController {
  static async getUsers(_, res) {
    try {
      const data = await UsersModel.find();

      // remove "password" and "isActive" from response
      const filteredData = data.map((user) => ({
        id: user._doc._id,
        firstname: user._doc.firstname,
        lastname: user._doc.lastname,
        username: user._doc.username,
        isAdmin: user._doc.isAdmin,
      }));

      res.json({
        data: filteredData,
        message:
          filteredData.length > 0 ? 'Usuarios encontrados' : 'Listado vacío',
      });
    } catch (err) {
      console.error('🟥', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: {
          data: null,
          message: `ERROR: ${err}`,
        },
      });
    }
  }

  static async getUser(req, res) {
    const {
      params: { id },
      user,
    } = req;

    // You can only see your own profile or, if you are admin, all
    if (id !== user._id && !user.isAdmin) {
      res.status(HttpStatus.FORBIDDEN).json({
        data: null,
        message: 'No tienes permisos para realizar esta acción',
      });
      return;
    }

    try {
      const data = await UsersModel.findOne({ _id: id });

      if (!data) {
        res.status(HttpStatus.NOT_FOUND).json({
          data: null,
          message: 'Usuario no encontrado',
        });
        return;
      }

      const filteredData = {
        id: data._doc._id,
        firstname: data._doc.firstname,
        lastname: data._doc.lastname,
        username: data._doc.username,
        isAdmin: data._doc.isAdmin,
      };

      res.json({
        data: filteredData,
        message: 'Usuario encontrado',
      });
    } catch (err) {
      console.error('🟥', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: {
          data: null,
          message: `ERROR: ${err}`,
        },
      });
    }
  }
}
