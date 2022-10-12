import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    auth: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,action) => {
      const {auth,user} = action.payload; 
      state.user = user
      state.auth = auth
    },
    getUser: (state) => {
      return {...state.user,isAuth: state.auth};
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser,getUser } = userSlice.actions

export default userSlice.reducer