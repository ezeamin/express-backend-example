import HttpStatus from 'http-status-codes';

import UsersModel from '../../../models/UserSchema.js';

export class DeleteController {
  static async deleteUser(req, res) {
    const {
      params: { id },
      user,
    } = req;

    // You can only delete your own profile or, if you are admin, all
    if (id !== user._id && !user.isAdmin) {
      res.status(HttpStatus.FORBIDDEN).json({
        data: null,
        message: 'No tienes permisos para realizar esta acción',
      });
      return;
    }

    try {
      const action = await UsersModel.updateOne(
        {
          _id: id, // condition #1
          isActive: true, // condition #2
        },
        {
          isActive: false, // what to update
        },
      );

      if (action.matchedCount === 0) {
        res.status(HttpStatus.NOT_FOUND).json({
          data: null,
          message: 'Usuario no encontrado',
        });
        return;
      }

      res.json({
        data: null,
        message: 'Usuario eliminado exitosamente',
      });
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        errors: {
          data: null,
          message: `ERROR: ${err}`,
        },
      });
    }
  }
}
