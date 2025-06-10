import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// api/v1/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(401).json({ success: false, message: 'User exist already' });

    const saltNumber = 10;
    const hashedPassword = await bcrypt.hash(password, saltNumber);

    const profilePhoto = process.env.USER_AVATAR;

    await User.create({
      name,
      email,
      password: hashedPassword,
      profilePhoto
    });

    return res.status(200).json({ success: true, message: 'Account created successfully.' });

  } catch (error) {
    console.log('register error: ', error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

// api/v1/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'User does not exist already' });

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) return res.status(401).json({ success: false, message: 'Incorrect Password' });

    const tokenData = { userId: user._id };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'strict'
    });

    const sendUser = {
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto
    }

    return res.status(200).json({ success: true, message: `${user.name} logged successfully.`, user: sendUser });

  } catch (error) {
    console.log('login error: ', error);
    return res.status(400).json({ success: false, message: error.message });
  }
}

// api/v1/user/authUser
export const authUser = async (req, res) => {
  try {
    const { id } = req;
    const user = await User.findById(id).select('-password'); // exclude password
    if (!user) return res.status(401).json({ success: false, message: 'User does not exist already' });
    const sendUser = {
      name: user.name,
      email: user.email,
      profilePhoto: user.profilePhoto
    }
    res.status(200).json({ success: true, user: sendUser });
  } catch (e) {
    console.log('userController check auth error', e.message);
    res.status(401).json({ success: false, message: e.message });
  }
}

// api/v1/user/logout
export const logout = async (req, res) => {
  try {
    const token = req.cookies.token;

    res.clearCookie('token', {
      maxAge: 0,
      httpOnly: true,
      sameSite: 'strict',
    });

    // res.cookie('token','',{maxAge: 0});

    return res.status(200).json({ success: true, message: 'Logged out successfully.' });

  } catch (error) {
    console.log('logout error: ', error);
    return res.status(400).json({ success: false, message: error.message });
  }
}