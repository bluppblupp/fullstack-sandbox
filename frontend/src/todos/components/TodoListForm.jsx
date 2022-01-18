import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Button, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import {Tooltip} from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox'

const useStyles = makeStyles({
  card: {
    margin: '1rem',
      },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '10px'
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
  
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h5' variant='h5'>
          {todoList.title}
        </Typography>
        <form className={classes.form}>
          {todos.map((todoitem, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
        
              </Typography>
             
              <TextField
                label='What to do?'
                value={todoitem.task}
                onChange={event => {
                  const newTodos = [
                    ...todos.slice(0, index),
                    {task: event.target.value, done: todos[index].done } , 
                    ...todos.slice(index + 1)
                  ]
                  setTodos(newTodos)
                  saveTodoList(todoList.id, newTodos)
                }}
                className={classes.textField}
              />
               <Tooltip title={todoitem.done ? 'Set todo as not completed' : 'Set todo as completed'}>
               <Checkbox
                      checked={todoitem.done}
                      inputProps={{ 'aria-label': 'Checkbox ' } }
                      onChange={() => {
                        const newTodos = [
                          ...todos.slice(0, index),
                          {task: todos[index].task, done: !todos[index].done},
                          ...todos.slice(index + 1)
                        ]
                        setTodos(newTodos) // immutable update
                        saveTodoList(todoList.id, newTodos)
                      }}
                  />
               </Tooltip>
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  const newTodos = [
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ]
                  
                  setTodos(newTodos)
                  saveTodoList(todoList.id, newTodos)

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
                const newTodos = [...todos, {task: '', done: false}]
                setTodos(newTodos)
                saveTodoList(todoList.id, newTodos)
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}

