import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activites: [],
}

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    setTimelineActivites: (state,action) => {
        state.activites = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setTimelineActivites,getTimelineActivites } = timelineSlice.actions

export default timelineSlice.reducer