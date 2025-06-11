import React from 'react'
import { IoMdArrowBack, IoMdMore } from 'react-icons/io'
import { BiArchiveIn } from 'react-icons/bi'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { MdDeleteOutline, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineAddTask, MdOutlineDriveFileMove, MdOutlineMarkEmailUnread, MdOutlineReport, MdOutlineWatchLater } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setSelectedMailsPage } from '../toolkit/appSlice'

const icons = [
  {
    icon: <IoMdArrowBack size={'20px'} />,
  },
  {
    icon: <BiArchiveIn size={'20px'} />,
  },
  {
    icon: <MdOutlineReport size={'20px'} />,
  },
  {
    icon: <MdDeleteOutline size={'20px'} />,
  },
  {
    icon: <MdOutlineMarkEmailUnread size={'20px'} />,
  },
  {
    icon: <MdOutlineWatchLater size={'20px'} />,
  },
  {
    icon: <MdOutlineAddTask size={'20px'} />,
  },
  {
    icon: <MdOutlineDriveFileMove size={'20px'} />,
  },
  {
    icon: <IoMdMore size={'20px'} />,
  },
]

const Mail = () => {
  const { id } = useParams();
  const { selectedEmail, selectedEmailsPage } = useSelector((store) => store.app);
  let dispatch = useDispatch();

  const navigate = useNavigate();
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/email/${id}`,
        {
          withCredentials: true
        }
      );
      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const handleClick = (i) => {
    if (i == 0) {
      navigate('/');
    }
    else if (i == 3) {
      deleteHandler();
    }
  }
  return (
    <div className='flex-1 bg-white rounded-xl mx-5'>
      <div className='flex items-center justify-between px-4'>
        <div className='flex items-center gap-2 text-gray-700 py-2'>
          {icons.map((icon, i) => {
            return (
              <div key={i} onClick={() => handleClick(i)} className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                {icon.icon}
              </div>
            )
          })}
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <span>1 to 50</span>
            <MdKeyboardArrowLeft size={'24px'} />
            <MdKeyboardArrowRight size={'24px'} />
          </div>
        </div>
      </div>
      <div className=' px-4 h-[90vh] overflow-y-auto'>
        <div className='flex justify-between bg-white items-center gap-1'>
          <div className='flex items-center gap-2'>
            <h1 className='font-medium'>{selectedEmail?.subject}</h1>
            <span className='text-sm bg-gray-200 rounded-md px-2'>Inbox</span>
          </div>
          <div className='flex-none text-gray-400 my-5 text-sm'>
            <p>12 days ago</p>
          </div>
        </div>
        <div className='text-gray-500 text-sm'>
          <h1>{selectedEmail?.to}</h1>
          <span>to me</span>
        </div>
        <div className='my-10'>
          <p>{selectedEmail?.message}</p>
        </div>
      </div>
    </div>
  )
}

export default Mail