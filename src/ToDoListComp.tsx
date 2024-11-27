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

interface MyState {
  todoArr: string[];
  todo: string;
};


export default class ToDoListComp extends Component {

  state: MyState = {
    todoArr: [],
    todo: '',
  };

  componentDidMount() {
    console.log('----componentDidMount-----')
    // this.setState({todoArr:['a','b']})
    const getItem = localStorage.getItem('todoList');
    if (getItem) {
      this.setState({
        todoArr: JSON.parse(getItem),
      });
    }
  }
  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any): void {
    console.log('------componentDidUpdate----');
  };

  shouldComponentUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any): any {
    console.log('------shouldComponentUpdate----');
    return true;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log('-----componentDidCatch-----')
  }


  // componentWillUnmount(): void {
  //   console.log('------componentWillUnmount----');
  // }

  addToDoHandler = () => {
    const { todoArr, todo } = this.state;

    if (todo === '') {
      alert('Input is blank');
      return;
    }

    // if (this.state.todoArr.length >=2) {
     
      const updatedTodoArr = [...todoArr, todo];
      this.setState({
        todoArr: updatedTodoArr,
        todo: '',
      });

      this.saveToLocalStorage(updatedTodoArr);

    // }
  };

  saveToLocalStorage = (todos: string[]) => {
    localStorage.setItem('todoList', JSON.stringify(todos));
  };


  removeHandler = (id: number) => {
    const removeItem = this.state.todoArr.filter((e, i) => i !== id)
    this.setState({
      todoArr: removeItem
    })
    this.saveToLocalStorage(removeItem)
  }
  render() {
    console.log('-----render------')
    
    const { todo, todoArr } = this.state;

    return (
      <>

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
                  <TableCell> <Button className='remove-btn' variant="outlined" size='small' onClick={() => this.removeHandler(index)}>Remove</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}
























// 1. ComponantDidMount => when componant is render =  immediately after mounting componant that is called only once when the component is mounted in the DOM.
// 2. ComponentDidUpdate=> whenever state and props value getting change
// 3.componentWillUnmount=. when component is destroy
// 4.shouldComponentUpdate=.when new props or state are received. Returns a boolean value