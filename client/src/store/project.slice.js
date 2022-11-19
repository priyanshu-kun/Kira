import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    projects: [],
    details: null
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
    },
    setProjectDetails: (state,action) => {
      state.details = action.payload;
    },
    getProjectDetails: (state,action) => {
      return state.details;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setProjects,getProjects,setProjectDetails,getProjectDetails } = projectsSlice.actions

export default projectsSlice.reducer