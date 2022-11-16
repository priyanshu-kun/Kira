import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: []
}

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state,action) => {
        state.projects = [...action.payload];
    },
    getProjects: (state) => {
        return [...state.projects];
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProjects,getProjects } = projectsSlice.actions

export default projectsSlice.reducer