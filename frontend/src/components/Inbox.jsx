import React, { useState } from 'react'
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { FaCaretDown, FaUserFriends } from 'react-icons/fa'
import { GoTag } from 'react-icons/go'
import { IoMdMore, IoMdRefresh } from 'react-icons/io'
import Emails from './Emails'

const mailType = [
  {
    icon: <MdInbox size={'20px'} />,
    text: 'Primary'
  },
  {
    icon: <GoTag size={'20px'} />,
    text: 'Promotions'
  },
  {
    icon: <FaUserFriends size={'20px'} />,
    text: 'Social'
  },
]

const Inbox = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className='flex-1 bg-white rounded-xl mx-5 '>
      <div className='flex items-center px-4 justify-between my-2'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <MdCropSquare size={'20px'} />
            <FaCaretDown size={'20px'} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
            <IoMdRefresh size={'20px'} />
          </div>
          <div className='p-2 rounded-full hover:bg-gray-200 cursor-pointer'>
            <IoMdMore size={'20px'} />
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <span>1 to 50</span>
          <MdKeyboardArrowLeft size={'24px'} />
          <MdKeyboardArrowRight size={'24px'} />
        </div>
      </div>
      <div className='h-[90vh] overflow-y-auto'>
        <div className='flex items-center gap-1'>
          {mailType.map((item,i)=>{
            return(
              <button onClick={()=>setSelected(i)} key={i} className={`flex items-center gap-5 p-4 w-52 hover:bg-gray-200 ${selected==i?'border-b-4 border-b-blue-500 text-blue-500':'border-b-transparent'}`}>
                {item.icon}
                {item.text}
              </button>
            )
          })}
        </div>
        <Emails />
      </div>
    </div>
  )
}

export default Inbox