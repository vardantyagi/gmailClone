import React from 'react'
import { MdCropSquare, MdOutlineStarBorderPurple500 } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { setSelectedEmail } from '../toolkit/appSlice';


const Email = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMail = () => {
    dispatch(setSelectedEmail(email));
    navigate(`/mail/${email._id}`);
  }
  const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date)) {
      throw new Error('Invalid date input');
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div onClick={openMail} className='flex items-center justify-between border-b border-gray-200 px-4 py-3 text-sm hover:bg-gray-200 hover:cursor-pointer'>
      <div className='flex items-center gap-3'>
        <div className='text-gray-400'>
          <MdCropSquare size={'20px'} />
        </div>
        <div className='text-gray-400'>
          <MdOutlineStarBorderPurple500 size={'20px'} />
        </div>
        <div>
          <h1 className='font-semibold'>{`${email?.subject}`}</h1>
        </div>
      </div>
      <div className='flex-1 ml-4'>
        <p>{`${email?.message}`}</p>
      </div>
      <div className='flex-none text-sm'>
        <p>{formatDate(email.createdAt)}</p>
      </div>
    </div>
  )
}

export default Email