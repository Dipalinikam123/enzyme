import axios from 'axios';
import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';


interface User {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  }
  phone: number
}
interface UserState {
  userData: User[]
}

export default class DummyApi extends Component<{}, UserState> {
  constructor(props: {}) {
    super(props)
    this.state = {
      userData: []
    }
  }
  componentDidMount(): void {
    this.userApi()
  }

  userApi = async () => {
    try {
      
      const response = await fetch('https://fakestoreapi.com/users');
      const data = await response.json();
      this.setState({ userData: data });
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  

  render() {
    return (
      <div>
        <Container sx={{mt:10}}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">Username</TableCell>
                  <TableCell align="right">Firstname</TableCell>
                  <TableCell align="right">Lastname</TableCell>
                  <TableCell align="right">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.userData?.map((e, i) => (
                  <TableRow
                    key={i}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {e.email}
                    </TableCell>
                    <TableCell align="right">{e.username}</TableCell>
                    <TableCell align="right">{e.name.firstname}</TableCell>
                    <TableCell align="right">{e.name.lastname}</TableCell>
                    <TableCell align="right">{e.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    )
  }
}

