import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../toolkit/appSlice";
import toast from "react-hot-toast";

const useGetAllEmails = () => {
  const dispatch = useDispatch();
  const {emails} = useSelector((store)=>store.app);
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/email/getAllEmails',
          {
            withCredentials: true
          }
        );
        dispatch(setEmails(res.data.emails));
      } catch (error) {
        toast.error('Some unexpected error occurred');
      }
    }
    fetchEmails();
  }, []);
}
export default useGetAllEmails;