const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  try {
    let token;

    // 1. Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 2. If token not found
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, token missing');
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request
    req.user = decoded;

    // 5. Allow request to continue
    next();

  } catch (error) {
    res.status(401);
    next(error);
  }
};

module.exports = { protect };
