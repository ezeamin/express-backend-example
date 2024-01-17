import HttpStatus from 'http-status-codes';

import ProductsModel from '../../../models/ProductSchema.js';

export class GetController {
  static async getProducts(_, res) {
    try {
      const data = await ProductsModel.find({ isActive: true });

      const filteredData = data.map((product) => ({
        id: product._doc._id,
        name: product._doc.name,
        price: product._doc.price,
        description: product._doc.description,
        image: product._doc.image,
      }));

      res.json({
        data: filteredData,
        message: data.length > 0 ? 'Productos encontrados' : 'Listado vacío',
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

  static async getProduct(req, res) {
    // params is what comes inside the endpoint url as data (see endpoint route)
    const {
      params: { id },
    } = req;

    try {
      const data = await ProductsModel.findOne({ _id: id, isActive: true });

      const filteredData = {
        id: data._doc._id,
        name: data._doc.name,
        price: data._doc.price,
        description: data._doc.description,
        image: data._doc.image,
      };

      res.json({
        data: filteredData,
        message: data ? 'Producto encontrado' : 'Producto no encontrado',
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
