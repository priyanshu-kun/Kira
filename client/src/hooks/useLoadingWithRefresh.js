import React, { useState, useEffect } from 'react'
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
          `http://localhost:5500/api/refresh`,
          {
            withCredentials: true,
          }
        );
        console.log("Inside refresh route: ",data)
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
        console.log(e)
        setLoading(!loading)
      }
    })()

  }, [])

  return {loading}

}
