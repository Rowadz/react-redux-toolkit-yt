import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit'

export const fetchData = createAsyncThunk(
  'users/fetchData',
  async (_, { dispatch }) => {
    const data = await fetch('http://localhost:3001/users').then((res) =>
      res.json()
    )
    const users = data.map(({ articles, comments, ...user }) => ({ ...user }))
    dispatch(setUsers(users))

    const articles = data
      .map((user) =>
        user.articles.map((article) => ({ ...article, userId: user.id }))
      )
      .flat()

    const comments = data
      .map((user) =>
        user.comments.map((comment) => ({ ...comment, userId: user.id }))
      )
      .flat()
  }
)

const usersAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {},
  reducers: {
    addUser: usersAdapter.addOne,
    setUsers: usersAdapter.setAll,
    addUsers: usersAdapter.addMany,
  },
})

export const { addUser, setUsers, addUsers } = usersSlice.actions

export default usersSlice.reducer
