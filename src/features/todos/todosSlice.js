import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    add(state, { payload }) {
      state.push(payload)
    },
  },
})

export const { add } = todoSlice.actions

export default todoSlice.reducer
