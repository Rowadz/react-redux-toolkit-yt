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
    del(state, { payload: index }) {
      state.splice(index, 1)
    },
    patch(state, { payload: { index, txt } }) {
      state[index].txt = txt
    },
    delProp(state, { payload: { index, prop } }) {
      delete state[index][prop]
    },
  },
})

export const { add, del, patch, delProp } = todoSlice.actions

export const selectTodos = ({ todos }) => todos

export default todoSlice.reducer
