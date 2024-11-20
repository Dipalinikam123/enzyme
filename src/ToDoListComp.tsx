import React, { Component } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';

interface MyState  {
  todoArr: string[];
  todo: string;
};

export default class ToDoListComp extends Component {
  state: MyState = {
    todoArr: [],
    todo: '',
  };

  componentDidMount() {
    const getItem = localStorage.getItem('todoList');
    if (getItem) {
      this.setState({
        todoArr: JSON.parse(getItem),
      });
    }
  }

  addToDoHandler = () => {
    const { todoArr, todo } = this.state;

    if (todo === '') {
      alert('Input is blank');
      return;
    }

    const updatedTodoArr = [...todoArr, todo];
    this.setState({
      todoArr: updatedTodoArr,
      todo: '',
    });

    this.saveToLocalStorage(updatedTodoArr);
  };

  saveToLocalStorage = (todos: string[]) => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  };


  removeHandler=(id:number)=>{
  const removeItem=this.state.todoArr.filter((e,i)=> i !== id)
  this.setState({
    todoArr:removeItem
  })
  this.saveToLocalStorage(removeItem)
  }
  render() {
    const { todo, todoArr } = this.state;

    return (
      <>
        <h2>ToDo List</h2>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <TextField
            type="text"
            id="outlined-basic"
            label="Enter here...."
            variant="outlined"
            size="small"
            value={todo}
            onChange={(e) =>
              this.setState({
                todo: e.target.value,
              })
            }
          />
          <Button className='add-btn' variant="outlined" onClick={this.addToDoHandler}>
            Add
          </Button>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ width: '27%', margin: 'auto', marginTop: '50px' }}
        >
          <Table aria-label="todo list table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight="bold">Id</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">List</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todoArr.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item}</TableCell>
                  <TableCell> <Button className='remove-btn' variant="outlined" size='small' onClick={()=>this.removeHandler(index)}>Remove</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
