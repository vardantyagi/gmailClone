import React from 'react'
import { LuPencil } from 'react-icons/lu';
import { MdInbox, MdOutlineWatchLater, MdOutlineDrafts, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { TbSend2 } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { setEmails, setInboxEmails, setOpen, setSelectedMailsPage } from '../toolkit/appSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import useGetAllEmails from '../hooks/useGetAllEmails.js';

const sidebarItems = [
  {
    icon: <MdInbox size={'20px'} className='shrink-0' />,
    text: 'All'
  },
  {
    icon: <IoMdStar size={'20px'} className='shrink-0' />,
    text: 'Starred'
  },
  {
    icon: <MdOutlineWatchLater size={'20px'} className='shrink-0' />,
    text: 'Sent'
  },
  {
    icon: <TbSend2 size={'20px'} className='shrink-0' />,
    text: 'Inbox'
  },
  {
    icon: <MdOutlineDrafts size={'20px'} className='shrink-0' />,
    text: 'Drafts'
  },
  {
    icon: <MdOutlineKeyboardArrowDown size={'20px'} className='shrink-0' />,
    text: 'More'
  },
]

const Sidebar = () => {
  const { inboxEmails, user } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const loadInbox = async () => {
    try {
      const email = { email: user?.email };
      if (email.email.length == 0) {
        toast.error('Please login first.');
        return;
      }
      const res = await axios.post('http://localhost:3000/api/v1/email/getAllInboxEmails', email, {
        withCredentials: true
      });
      dispatch(setInboxEmails(res.data.inboxEmails));
      dispatch(setSelectedMailsPage('inbox'));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const handleClick = (i) => {
    if (i == 0) {
      dispatch(setSelectedMailsPage('all'));
    }
    else if (i == 3) {
      loadInbox();
    }
  }
  return (
    <div className='w-[15%]'>
      <div className='p-3'>
        <button onClick={() => dispatch(setOpen(true))} className='flex items-center gap-2 bg-[#C2E7FF] p-4 rounded-2xl hover:shadow'>
          <LuPencil size={'24px'} />Compose
        </button>
      </div>
      <div className='text-gray-500'>
        {sidebarItems && sidebarItems.map((item, i) => {
          return (
            <div onClick={() => handleClick(i)} key={i} className='flex items-center pl-6 py-1 rounded-r-full gap-4 my-2 hover:cursor-pointer hover:bg-gray-300'>
              {item.icon}
              <p>{item.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar