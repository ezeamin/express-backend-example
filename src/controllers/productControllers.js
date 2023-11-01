import ProductsModel from '../models/ProductSchema.js';

// ----------------------------
// GET
// ----------------------------

// The "_" is a parameter that is not used (it would be the "req")
// but it is put so that it does not give an error (unused var)
export const getProducts = async (_, res) => {
  try {
    const data = await ProductsModel.find();

    res.json({
      data,
      message: data.length > 0 ? 'Productos encontrados' : 'Listado vacío',
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

export const getProduct = async (req, res) => {
  // params is what comes inside the endpoint url as data (see endpoint route)
  const {
    params: { id },
  } = req;

  try {
    const data = await ProductsModel.findOne({ _id: id });

    res.json({
      data,
      message: data ? 'Producto encontrado' : 'Producto no encontrado',
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

// ----------------------------
// POST
// ----------------------------

export const postProduct = async (req, res) => {
  const { body } = req;

  const newProduct = new ProductsModel({
    name: body.name,
    price: body.price,
    description: body.description,
    image: body.image,
    isActive: true,
  });

  try {
    await newProduct.save();

    res.json({
      data: null,
      message: 'Producto creado exitosamente',
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

// ----------------------------
// PUT
// ----------------------------

export const putProduct = async (req, res) => {
  // We read the id and data of the product to update
  const {
    params: { id },
    body,
  } = req;

  try {
    // (filter,newData)
    const action = await ProductsModel.updateOne({ _id: id }, body);

    // modifiedCount says how many elements were affected
    if (action.modifiedCount === 0) {
      res.status(404).json({
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
    res.status(500).json({
      errors: {
        data: null,
        message: `ERROR: ${err}`,
      },
    });
  }
};

// ----------------------------
// DELETE
// ----------------------------

export const deleteProduct = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const action = await ProductsModel.updateOne({ _id: id }, { isActive: false });

    if (action.modifiedCount === 0) {
      res.status(404).json({
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
    res.status(500).json({
      errors: {
        data: null,
        message: `ERROR: ${err}`,
      },
    });
  }
};
