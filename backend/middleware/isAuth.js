import jwt from 'jsonwebtoken';

const isAuth = async(req,res,next)=>{
  try {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({success: true, message: 'User not authenticated.'});

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(!decode) return res.status(401).json({success: true, message: 'Invalid token'});

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log('isAuth error: ',error);
  }
}

export default isAuth;