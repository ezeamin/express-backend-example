import HttpStatus from 'http-status-codes';

import ProductsModel from '../../../models/ProductSchema.js';

export class PostController {
  static async postProduct(req, res) {
    const { body } = req;

    const newProduct = new ProductsModel({
      name: body.name.trim(),
      price: body.price,
      description: body.description.trim(),
      image: body.image.trim(),
      isActive: true,
    });

    try {
      await newProduct.save();

      res.json({
        data: null,
        message: 'Producto creado exitosamente',
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
