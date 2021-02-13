import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
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

    dispatch(setArticles(articles))

    const comments = data
      .map((user) =>
        user.comments.map((comment) => ({ ...comment, userId: user.id }))
      )
      .flat()

    dispatch(setComments(comments))
  }
)

const usersAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
})

const commentsAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
})

const articlesAdapter = createEntityAdapter({
  selectId: ({ id }) => id,
})

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    comments: commentsAdapter.getInitialState(),
    articles: articlesAdapter.getInitialState(),
  }),
  reducers: {
    addUser: usersAdapter.addOne,
    setUsers: usersAdapter.setAll,
    addUsers: usersAdapter.addMany,
    setComments(state, { payload }) {
      commentsAdapter.setAll(state.comments, payload)
    },
    setArticles(state, { payload }) {
      articlesAdapter.setAll(state.articles, payload)
    },
  },
})

export const {
  addUser,
  setUsers,
  addUsers,
  setComments,
  setArticles,
} = usersSlice.actions

export const {
  selectAll: selectAllUsers,
  selectById: selectUsersById,
  selectEntities: selectUsersEntities,
  selectIds: selectUsersIds,
  selectTotal: selectTotalUsers,
} = usersAdapter.getSelectors()

export const selectUsersAdapter = (state) => state.users

export const selectAtricles = createSelector(selectUsersAdapter, (state) =>
  articlesAdapter.getSelectors().selectAll(state.articles)
)

export const selectAtriclesIds = createSelector(selectUsersAdapter, (state) =>
  articlesAdapter.getSelectors().selectIds(state.articles)
)

export default usersSlice.reducer

// http://localhost:3001/users response::
// [{
//   "id": "843e9362-bf59-4701-ac75-805e56bfbab4",
//   "email": "Emily.Brown36@yahoo.com",
//   "name": "Edwin Mayert",
//   "articles": [
//     {
//       "id": "5a8b3480-5218-4eb9-b983-0f032311b6cf",
//       "paragraphs": "Illo quisquam suscipit magnam qui autem sit nulla enim. Aut est porro et sed animi. Labore eius sit odit. Laborum quasi aut qui. Delectus ea sed non et.\n \rVelit enim occaecati nulla sint. Non quia molestiae soluta temporibus non omnis aut. Iure facere mollitia est est repellendus consequatur.\n \rExplicabo sequi ea saepe quia tenetur quae illum. Optio officia sit voluptatem accusantium iure. Repellendus excepturi nemo quam ipsam dicta et consectetur asperiores consequuntur.",
//       "image": "http://lorempixel.com/640/480/nature"
//     },
//     {
//       "id": "06a894e5-f11d-4ad1-be47-c795ea69cd8b",
//       "paragraphs": "Nulla doloremque ratione sed id et sit rerum earum amet. Odio rerum ea unde qui quod. Modi in labore reprehenderit. Vero alias sit consequatur.\n \rQuis quis impedit architecto. Enim rerum ad et dolore eum error est. Voluptatem accusantium ut quo quo eum iusto repudiandae est est. Et beatae perspiciatis.\n \rConsequatur qui repudiandae omnis nesciunt similique. Velit eum tempore saepe odit distinctio voluptas ad consequatur. Impedit quos quae et placeat quia harum reiciendis accusamus. Nesciunt ducimus fugiat deserunt inventore. Eum architecto delectus. Consectetur aut quia rerum ut nemo dolor.",
//       "image": "http://lorempixel.com/640/480/food"
//     }
//   ],
//   "comments": [
//     {
//       "id": "cb15983b-2e86-44c2-9ef7-27b6162cfc71",
//       "paragraph": "Autem sed quam veniam ut iure sunt modi placeat. Neque in fugit eligendi architecto dolores doloremque. In neque voluptatem voluptates voluptatem ut aut sed inventore. Laboriosam tenetur itaque delectus itaque quaerat. Eos et adipisci aliquam consequatur est perferendis ipsam. Ipsam omnis ut nihil et."
//     },
//     {
//       "id": "9a0b1ff5-8d71-40c0-91a5-cd3e9987474c",
//       "paragraph": "Nulla cupiditate itaque facilis. Accusantium quae repudiandae qui sit expedita omnis unde. Neque quidem animi aut itaque voluptatem aut omnis excepturi. Atque ipsam laborum."
//     }
//   ]
// }]
