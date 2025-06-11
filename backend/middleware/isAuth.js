import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  const {token} = req.cookies;
  if (!token) return res.status(401).json({ success: false, message: 'Not Logged In' });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decode.userId) {
      req.id = decode.userId;
      next();
    }
    else {
      return res.status(401).json({ success: false, message: 'Not Authorized' });
    }
  } catch (error) {
    console.log('isAuth error: ', error.message);
    return res.status(401).json({ success: false, message: error.message });
  }
}

export default isAuth;