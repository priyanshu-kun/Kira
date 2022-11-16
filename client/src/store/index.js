import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user.slice"
import authReducer from "./auth.slice"
import projectReducer from './project.slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    projects: projectReducer
  },
})