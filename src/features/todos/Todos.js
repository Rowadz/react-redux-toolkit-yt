import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectTodos, del, patch, delProp } from './todosSlice'
import { List, FlexboxGrid, IconButton, Icon } from 'rsuite'

export default function Todos() {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()
  return (
    <List bordered>
      {todos.map(({ txt, id }, index) => (
        <List.Item bordered>
          <FlexboxGrid key={id}>
            <FlexboxGrid.Item colspan={12}>{txt}</FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={10}></FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={2}>
              <IconButton
                onClick={() => dispatch(del(index))}
                icon={<Icon icon="minus" />}
                color="red"
                circle
              />
              <IconButton
                onClick={() => dispatch(patch({ index, txt: 'Rowadz' }))}
                icon={<Icon icon="magic" />}
                color="blue"
                circle
              />
              <IconButton
                onClick={() => dispatch(delProp({ index, prop: 'txt' }))}
                icon={<Icon icon="address-book" />}
                color="yellow"
                circle
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </List.Item>
      ))}
    </List>
  )
}
