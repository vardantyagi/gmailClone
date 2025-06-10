import './App.css'
import Navbar from './components/Navbar'
import Inbox from './components/Inbox'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import Mail from './components/Mail'
import SendEmail from './components/SendEmail'
import Login from './components/Login'
import Signup from './components/Signup'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAuthUser } from './toolkit/appSlice'
import axios from 'axios'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <Inbox />
      },
      {
        path: '/mail/:id',
        element: <Mail />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])

function App() {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    try {      
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/authUser`, { withCredentials: true });
      const { data } = res;      
      if (data.success) {
        dispatch(setAuthUser(data.user));
      }
    } catch (e) {
      dispatch(setAuthUser(null));
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  return (
    <div className='bg-[#F6F8FC] h-screen'>
      <RouterProvider router={appRouter} />
      <div className='bg-red-500 absolute right-2 bottom-2 w-[30%] z-10'>
        <SendEmail />
      </div>
      <Toaster />
    </div>
  )
}

export default App