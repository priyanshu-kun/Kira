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

    },
    getUser: (state) => {

    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser,getUser } = userSlice.actions

export default userSlice.reducer