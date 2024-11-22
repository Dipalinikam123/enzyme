import { Box, TextField } from '@mui/material'
import React, { Component } from 'react'

export default class RegisterForm extends Component {
  render() {
    return (
      <div>
        <Box>
        <TextField
            label="First Name"
            type="text"
            fullWidth
            // value={registerForm?.firstName}
            // onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
            margin="normal"
          />
        <TextField
            label="Last Name"
            type="text"
            fullWidth
            // value={registerForm?.firstName}
            // onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
            margin="normal"
          />
        <TextField
            label="Email"
            type="text"
            fullWidth
            // value={registerForm?.firstName}
            // onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
            margin="normal"
          />
        <TextField
            label="Password"
            type="password"
            fullWidth
            // value={registerForm?.firstName}
            // onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })}
            margin="normal"
          />
        </Box>
      </div>
    )
  }
}
