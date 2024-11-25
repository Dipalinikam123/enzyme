import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RegisterModel from '../modal/RegisterModel';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';

  interface MyState {
  open: boolean;
  modalFlag: boolean;
  loginState: {
    email: string;
    password: string;
  };
  registerState: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
  errorState: {
    firstNameError: boolean;
    lastNameError: boolean;
    emailError: boolean,
    passwordError: boolean
  };
  token:string,
  navigateTo: string
}

export default class Navbar extends Component<{}, MyState> {
  state: MyState = {
    open: false,
    modalFlag: false,
    registerState: {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    },
    loginState: {
      email: "",
      password: ""
    },
    errorState: {
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false
    },
    token: '',
    navigateTo: '' 

  };

  componentDidMount(): void {
    const storageToken = localStorage.getItem('token')
    if (storageToken) {
      this.setState({ token: JSON.parse(storageToken) })
    }
  }

  handleOpen = (): void => {
    this.setState({ open: true });
    this.setState({ modalFlag: false })
  }

  handleClose = (): void => {
    this.setState({ modalFlag: false })
    this.setState({ open: false });
    this.setState({
      errorState: {
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false
      }
    });
  }

  handleFlag = (): void => this.setState({ modalFlag: true })

  registerHandler = (): void => {
    const { firstName, lastName, email, password } = this.state.registerState;
    const errors = {
      emailError: !this.validateEmail(email),
      passwordError: password.length < 6,
      firstNameError: firstName.length < 1,
      lastNameError: lastName.length < 1,
    };

    if (errors.firstNameError || errors.lastNameError || errors.emailError || errors.passwordError) {
      this.setState({ errorState: { ...this.state.errorState, ...errors } });
      return;
    }

    axios({
      method: 'post',
      url: 'https://backendproject-1ezp.onrender.com/auth/sign-up',
      data: this.state.registerState
    }).then((res) => {
      console.log("--res", res)
      localStorage.setItem("token", JSON.stringify(res?.data?.token))
      this.setState({
        registerState: {
          firstName: "",
          lastName: "",
          email: "",
          password: ""
        }
      })
      this.handleClose();
      <Navigate to="/" />;
    }).catch((err) => {
      console.log("----errr", err)
      if (err.response.data.message === "E11000 duplicate key error collection: test.users index: email_1 dup key: { email: \"abc@gmail.com\" }") {
        alert("----User Already Register-----")
      }
    })
  }
  validateEmail = (email: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  loginHandler = (): void => {
    const { email, password } = this.state.loginState;
    const errors = {
      emailError: !this.validateEmail(email),
      passwordError: password.length < 6,
    };

    if (errors.emailError || errors.passwordError) {
      this.setState({ errorState: { ...this.state.errorState, ...errors } });
      return;
    }

    axios({
      method: 'post',
      url: 'https://backendproject-1ezp.onrender.com/auth/sign-in',
      data: this.state.loginState
    }).then((res) => {
      console.log("--res", res)
      localStorage.setItem("token", JSON.stringify(res?.data?.token))
      this.setState({ token: res?.data?.token })
      this.setState({
        loginState: {
          email: "",
          password: ""
        },
        navigateTo: "/",
      })
      this.handleClose();
     
    }).catch((err) => {
      console.log("----errr", err)
    })
  }

  onRegisterFieldChange = (field: string, value: string) => {
    this.setState((prevState) => ({
      registerState: {
        ...prevState.registerState,
        [field]: value,
      },
    }));
  };
  onLoginFieldChange = (field: string, value: string) => {
    this.setState((prevState) => ({
      loginState: {
        ...prevState.loginState,
        [field]: value,
      },
    }));
  };

  handleLogout = (): void => {
    localStorage.removeItem('token')
    this.setState({ token: '' })
  }
  render() {
    console.log('---token', this.state.token)
    return (
      <div>
        <RegisterModel
          open={this.state.open}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          handleFlag={this.handleFlag}
          modalFlag={this.state.modalFlag}
          registerHandler={this.registerHandler}
          registerState={this.state.registerState}
          onRegisterFieldChange={this.onRegisterFieldChange}
          loginState={this.state.loginState}
          onLoginFieldChange={this.onLoginFieldChange}
          loginHandler={this.loginHandler}
          errorState={this.state.errorState}
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
              {
                this.state.token && <Typography sx={{ flexGrow: 1 }}><NavLink style={{ textDecoration: "none", color: 'white', fontWeight: "bold" }} to='/product'>Product</NavLink></Typography>
              }
              {
                !this.state.token ? <Button color="inherit" onClick={this.handleOpen}>Login </Button> : <Button color="inherit" onClick={this.handleLogout}>LogOut</Button>
              }

            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }
}
