import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, input,
        { withCredentials: true }
      );
      if (res.data.success) {        
        toast.success(res.data.message);
        navigate('/login');
      } else if (!res.data.success) {        
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className='flex items-center justify-center w-screen pt-20'>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-3 bg-white p-4 w-[20%] min-w-64'>
        <h1 className='font-bold text-xl uppercase my-2'>Signup</h1>
        <input onChange={onChangeHandler} name='name' value={input.name} type="text" placeholder='Name' className='border border-gray-400 rounded-md px-2 py-1 outline-0' />
        <input onChange={onChangeHandler} name='email' value={input.email} type="email" placeholder='Email' className='border border-gray-400 rounded-md px-2 py-1 outline-0' />
        <input onChange={onChangeHandler} name='password' value={input.password} type="password" placeholder='Password' className='border border-gray-400 rounded-md px-2 py-1 outline-0' />
        <button type='submit' className='bg-gray-800 p-2 text-white rounded-md cursor-pointer'>Signup</button>
        <p className='text-sm'>Already have an account?<Link to="/login" className='text-blue-500 font-bold'>Login</Link></p>
      </form>
    </div>
  )
}

export default Signup