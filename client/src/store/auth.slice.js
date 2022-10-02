import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    otp: {
      hash: "",
      Email: ""
    }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state,action) => {
        state.user = action.payload;
    },
    setOTPData: (state,action) => {
      state.otp.hash = action.payload.hash;
      state.otp.Email = action.payload.Email;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth,setOTPData } = authSlice.actions

export default authSlice.reducer