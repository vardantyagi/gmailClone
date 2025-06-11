import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { setEmails, setOpen } from '../toolkit/appSlice';
import toast from 'react-hot-toast';
import axios from 'axios';

const SendEmail = () => {
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    message: ''
  });
  const { open, emails } = useSelector((store) => store.app);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/email/create`, formData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      dispatch(setEmails([...emails, res.data.email]));
      setFormData({
        to: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      toast.error(error.response.data.message);
    }
    dispatch(setOpen(false));
  }

  return (
    <div className={`${open ? 'block' : 'hidden'} bg-white max-w-6xl shadow-xl shadow-slate-600 rounded-t-md`}>
      <div className='flex items-center justify-between px-3 py-2 bg-[#F2F6FC]'>
        <h1>New Message</h1>
        <div onClick={() => dispatch(setOpen(false))} className='p-2 rounded-full hover:bg-gray-200'>
          <RxCross2 size={'20px'} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 p-3'>
        <input onChange={onChangeHandler} name='to' value={formData.to} type="text" placeholder='To' className='outline-none py-1' />
        <input onChange={onChangeHandler} name='subject' value={formData.subject} type="text" placeholder='Subject' className='outline-none py-1' />
        <textarea onChange={onChangeHandler} name='message' value={formData.message} rows={10} cols={30} className='outline-none py-1' placeholder='Message'></textarea>
        <button type='submit' className='bg-blue-700 rounded-full px-4 py-1 font-bold text-white w-fit cursor-pointer'>Send</button>
      </form>
    </div>
  )
}

export default SendEmail