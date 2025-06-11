import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { gmailLogo } from '../utility/constants';
import { IoIosSearch, IoIosSettings } from 'react-icons/io';
import { CiCircleQuestion } from 'react-icons/ci';
import { TbGridDots } from 'react-icons/tb';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { setAuthUser, setSearchText } from '../toolkit/appSlice.js';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [search, setSearch] = useState("");
  const { user } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
        // navigate('/login');
      } else {
        toast.error('some error occured');
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const loginHandler = () => {
    navigate('/login');
  }

  const signupHandler = () => {
    navigate('/signup');
  }

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/authUser`, { withCredentials: true });
      const { data } = res;
      if (data.success) {
        dispatch(setAuthUser(data.user));
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.log("Please Login first");
      } else {
        console.error("Error fetching user:", e.message);
      }
      dispatch(setAuthUser(null));
    }
  }

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    dispatch(setSearchText(search));
  }, [search]);
  return (
    <div className='flex items-center justify-between mx-3 h-16'>

      <div className='flex items-center gap-10'>
        <div className='flex items-center gap-2'>
          <div className='hover:bg-gray-200 rounded-full p-3 cursor-pointer'>
            <RxHamburgerMenu className='' />
          </div>
          <img src={gmailLogo} alt="logo" className='w-8' />
          <h1 className='text-2xl text-gray-500 font-medium'>Gmail</h1>
        </div>
      </div>

      {
        user ? (
          <>
            {/* mr-55 */}
            <div className='w-[50%]  -ml-36'>
              <div className='flex items-center bg-[#EAF1FB] px-2 py-3 rounded-full'>
                <IoIosSearch size='24px' className='text-gray-700' />
                <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search Mail' className='rounded-full w-full bg-transparent outline-none px-1' />
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <CiCircleQuestion size='24px' />
              </div>
              <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <IoIosSettings size='24px' />
              </div>
              <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
                <TbGridDots size='24px' />
              </div>
              <span onClick={logoutHandler} className='bg-black text-white rounded-full px-2 py-1 cursor-pointer'>Logout</span>
              <Avatar src={user?.profilePhoto} size="40" round={true} />
            </div>
          </>
        ) : <span><button onClick={loginHandler} className='bg-black text-white px-2 py-1 cursor-pointer rounded-full mr-2 font-bold'>Login</button ><button onClick={signupHandler} className='bg-black text-white px-2 py-1 cursor-pointer rounded-full font-bold'>Signup</button></span>
      }

    </div>
  )
}

export default Navbar