import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const TodoListForm = ({ todoList, saveTodoList }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(todoList.todos)

  const handleSubmit = event => {
    event.preventDefault()
    saveTodoList(todoList.id, { todos })
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {todoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((name, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <TextField
                label='What to do?'
                value={name}
                onChange={event => {
                  const newInput = [
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1)
                  ]
                  setTodos(newInput)
                  saveTodoList(todoList.id, newInput)
                }}
                className={classes.textField}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  const newInput = [
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ]
                  setTodos(newInput)
                  saveTodoList(todoList.id, newInput)
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                const newInput = [...todos, '']
                setTodos(newInput)
                saveTodoList(todoList.id, newInput)
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}