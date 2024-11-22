import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RegisterModel from '../modal/RegisterModel';

interface MyState {
  open: boolean;
  modalFlag: boolean
}

export default class Navbar extends Component<{}, MyState> {
  state: MyState = {
    open: false,
    modalFlag: false
  };

  handleOpen = (): void => {
    this.setState({ open: true });
     this.setState({modalFlag:false})
  }

  handleClose = (): void => {
    this.setState({modalFlag:false})
    this.setState({ open: false });
  }

  handleFlag = (): void => this.setState({ modalFlag: true })

  render() {
    return (
      <div>
        <RegisterModel
          open={this.state.open}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          handleFlag={this.handleFlag}
          modalFlag={this.state.modalFlag}
        />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit" onClick={this.handleOpen}>
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }
}
