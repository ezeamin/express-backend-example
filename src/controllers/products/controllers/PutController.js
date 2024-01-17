import HttpStatus from 'http-status-codes';

import ProductsModel from '../../../models/ProductSchema.js';

export class PutController {
  static async putProduct(req, res) {
    // We read the id and data of the product to update
    const {
      params: { id },
      body,
    } = req;

    // Trim body fields
    Object.keys(body).forEach((key) => {
      if (typeof body[key] === 'string') {
        body[key] = body[key].trim();
      }
    });

    try {
      // (filter,newData)
      const action = await ProductsModel.updateOne({ _id: id }, body);

      // matchedCount says how many elements were found to be modified
      if (action.matchedCount === 0) {
        res.status(HttpStatus.NOT_FOUND).json({
          data: null,
          message: 'Producto no encontrado',
        });
        return;
      }

      res.json({
        data: null,
        message: 'Producto actualizado',
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
