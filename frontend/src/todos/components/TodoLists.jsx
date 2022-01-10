import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'
import { TodoListForm } from './TodoListForm'
import axios from 'axios'


export const TodoLists = ({ style }) => {
  const [todoLists, setTodoLists] = useState({})
  const [activeList, setActiveList] = useState()

  const retreiveTodos = () => {
    axios.get('http://localhost:3001/retreiveTodos')
    .then ((response) => {
      setTodoLists(response.data);
      console.log('List retrieved from server!')
      console.log(response.data)
    })
    .catch(error => {console.error('Error while retrieving lists from server ' + error)})
}


  useEffect(() => {
    retreiveTodos()
      //.then(setTodoLists)
  }, [])

  if (!Object.keys(todoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
        <Typography
          component='h2'
        >
          My Todo Lists
        </Typography>
        <List>
          {Object.keys(todoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={todoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {todoLists[activeList] && <TodoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      todoList={todoLists[activeList]}
      saveTodoList={(id, { todos }) => {
        const listToUpdate = todoLists[id]
        setTodoLists({
          ...todoLists,
          [id]: { ...listToUpdate, todos }
        })
      }}
    />}
  </Fragment>
}