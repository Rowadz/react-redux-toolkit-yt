import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodos, del } from './todosSlice'
import { List, FlexboxGrid, IconButton, Icon } from 'rsuite'

export default function Todos() {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()
  return (
    <List bordered>
      {todos.map(({ txt, id }) => (
        <FlexboxGrid key={id}>
          <FlexboxGrid.Item colspan={12}>
            <List.Item bordered>{txt}</List.Item>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={10}></FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={2}>
            <IconButton
              onClick={() => dispatch(del(id))}
              icon={<Icon icon="minus" />}
              color="red"
              circle
            />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      ))}
    </List>
  )
}
