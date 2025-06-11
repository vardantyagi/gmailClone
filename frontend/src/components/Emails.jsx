import React, { useEffect, useState } from 'react'
import Email from './Email'
import toast from 'react-hot-toast';
import useGetAllEmails from '../hooks/useGetAllEmails.js';
import { useDispatch, useSelector } from 'react-redux';
import { setEmails } from '../toolkit/appSlice.js';

const Emails = () => {
  useGetAllEmails();
  const { user, emails, searchText, inboxEmails, selectedEmailsPage } = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const [filterEmail, setFilterEmail] = useState(emails);

  useEffect(() => {
    const loadInboxEmails = () => {
      setFilterEmail(inboxEmails);
    }
      loadInboxEmails();
  }, [inboxEmails]);

  useEffect(() => {
    if (selectedEmailsPage == 'all') {
      setFilterEmail(emails);
    } else if (selectedEmailsPage == 'inbox') {
      setFilterEmail(inboxEmails);
    }
  }, [selectedEmailsPage])

  useEffect(() => {
    const filteredEmail = emails?.filter((email) => {
      return email.subject.toLowerCase().includes(searchText.toLowerCase()) || email.to.toLowerCase().includes(searchText.toLowerCase()) || email.message.toLowerCase().includes(searchText.toLowerCase())
    })
    setFilterEmail(filteredEmail);
  }, [searchText, emails]);

  return (
    <div>
      {
        user ? (filterEmail.length > 0 ? filterEmail?.map((email, i) => {
          return (
            <Email key={email?._id} email={email} />
          )
        }) : (<div className='p-9'><h1 className='font-bold text-xl'>No emails found.</h1></div>)) : (<div></div>)
      }
    </div>
  )
}

export default Emails