import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todos',
  initialState: [
    { id: 1, txt: 'rowadz' },
    { id: 2, txt: 'rowadz02' },
    { id: 3, txt: 'rowadz03' },
  ],
  reducers: {
    add(state, { payload }) {
      state.push(payload)
    },
    del(state, { payload }) {
      return state.filter(({ id }) => id !== payload)
    },
  },
})

export const { add, del } = todoSlice.actions

export const selectTodos = ({ todos }) => todos

export default todoSlice.reducer
