import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../toolkit/appSlice";
import toast from "react-hot-toast";

const useGetAllEmails = () => {
  const dispatch = useDispatch();
  const { emails, user } = useSelector((store) => store.app);
  useEffect(() => {
    const fetchEmails = async () => {
      try {
      //   if(!user){
      //   return;
      // }
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/email/getAllEmails`,
          {
            withCredentials: true
          }
        );
        if (res.data.success) {
          dispatch(setEmails(res.data.emails));
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("User not authenticated, skipping email fetch.");
        } else {
          console.error("Email fetch error:", error.message);
          toast.error("Unexpected error occurred");
        }
      }
    }
      fetchEmails();
  }, []);
}
export default useGetAllEmails;