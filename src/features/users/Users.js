import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchData } from './usersSlice'

const Users = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])
  return <div></div>
}

export default Users
