import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { setAuthUser } from '../toolkit/appSlice';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/v1/user/login', input,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='flex items-center justify-center w-screen pt-20'>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-3 bg-white p-4 w-[20%] min-w-64'>
        <h1 className='font-bold text-xl uppercase my-2'>Login</h1>
        <input onChange={onChangeHandler} name='email' value={input.email} type="email" placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1 outline-0' />
        <input onChange={onChangeHandler} name='password' value={input.password} type="password" placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1 outline-0' />
        <button type='submit' className='bg-gray-800 p-2 text-white rounded-md cursor-pointer'>Login</button>
        <p className='text-sm'>New User?<Link to="/signup" className='text-blue-500 font-bold'>Signup</Link></p>
      </form>
    </div>
  )
}

export default Login