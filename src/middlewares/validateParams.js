const validateParams = (req, res, next, schema) => {
  const { error } = schema.validate(req.params);

  if (error) {
    res.status(400).json({ errors: error.details });
    return;
  }

  // No errors, continue with the request
  next();
};

export default validateParams;
