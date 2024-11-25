import { Box, TextField } from '@mui/material'
import React, { Component } from 'react'

interface LoginInterface {
  loginState: {
    email: string;
    password: string;
  };
  onLoginFieldChange: (field: string, value: string) => void;
  errorState: {
    emailError: boolean,
    passwordError: boolean
  }
}
export default class LoginForm extends Component<LoginInterface> {
  render() {
    const { loginState, onLoginFieldChange ,errorState} = this.props
    return (
      <div>
        <Box>
          <TextField
            error={errorState.emailError}
            id="outlined-error-helper-text"
            label="Email"
            type="text"
            fullWidth
            value={loginState?.email}
            onChange={(e) => onLoginFieldChange('email', e?.target?.value)}
            margin="normal"
           helperText={errorState.emailError && "Invalid Email."}
          />
          <TextField
           error={errorState.passwordError}
            label="Password"
            type="password"
            fullWidth
            value={loginState?.password}
            onChange={(e) => onLoginFieldChange('password', e?.target?.value)}
            margin="normal"
            helperText={errorState.passwordError && "Password must be 6 character"}
          />
        </Box>
      </div>
    )
  }
}
