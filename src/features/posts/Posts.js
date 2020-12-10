import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from './postsSlice'

const Posts = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts({ limit: 5 }))
  }, [dispatch])

  return (
    <div>
      <h1>posts...</h1>
    </div>
  )
}

export default Posts
