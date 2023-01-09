import { useState, useEffect } from 'react'
import axios from 'axios';
import { setUser } from '../store/user.slice';
import { useDispatch } from 'react-redux';
axios.defaults.withCredentials = true;

export function useLoadingWithRefresh() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );
        if (data.reqStatus) {
          const User = {
            auth: data.data.auth,
            user: data.data.userDto
          }
          dispatch(setUser(User))
          setLoading(!loading)
        }
      }
      catch (e) {
        setLoading(!loading)
      }
    })()

  }, [])

  return {loading}

}
