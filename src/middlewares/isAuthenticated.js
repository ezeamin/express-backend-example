import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

const isAuthenticated = (req, res, next) => {
  const { headers } = req;
  const authHeader = headers.authorization; // string

  if (!authHeader) {
    res.status(401).json({
      data: null,
      message: 'Token no detectado en el header "Authorization"',
    });
    return;
  }

  // Separate the word "Bearer" from the token
  const token = authHeader.split(' ')[1];

  try {
    const tokenInfo = jwt.verify(token, secretKey);

    req.user = tokenInfo;

    // valid token
    next();
  } catch (err) {
    // invalid token
    res.status(401).json({
      data: null,
      message: 'Token no valido o expirado',
    });
  }
};

export default isAuthenticated;
