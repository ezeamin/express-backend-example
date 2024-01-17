import HttpStatus from 'http-status-codes';

import ProductsModel from '../../../models/ProductSchema.js';

export class DeleteController {
  static async deleteProduct(req, res) {
    const {
      params: { id },
    } = req;

    try {
      const action = await ProductsModel.updateOne(
        { _id: id, isActive: true },
        { isActive: false },
      );

      if (action.matchedCount === 0) {
        res.status(HttpStatus.NOT_FOUND).json({
          data: null,
          message: 'Producto no encontrado',
        });
        return;
      }

      res.json({
        data: null,
        message: 'Producto eliminado',
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
