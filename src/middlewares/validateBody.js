const validateBody = (req, res, next, schema) => {
  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ errors: error.details });
    return;
  }

  // No errors, continue with the request
  next();
};

export default validateBody;
