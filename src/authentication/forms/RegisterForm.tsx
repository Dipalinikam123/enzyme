import { Box, TextField } from '@mui/material'
import React, { Component } from 'react'

interface RegisterFormsInterFace {
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
  }
  onRegisterFieldChange: (field: string, value: string) => void;
}
export default class RegisterForm extends Component<RegisterFormsInterFace> {
  render() {
    const { registerState, onRegisterFieldChange, errorState } = this.props
    console.log('-----registerState--', registerState)
    return (
      <div>
        <Box>
          <TextField
            error={errorState.firstNameError}
            label="First Name"
            type="text"
            fullWidth
            value={registerState?.firstName}
            onChange={(e) => onRegisterFieldChange('firstName', e?.target?.value)}
            margin="normal"
            helperText={errorState.firstNameError && "First Name is required"}
          />
          <TextField
            error={errorState.lastNameError}
            label="Last Name"
            type="text"
            fullWidth
            value={registerState?.lastName}
            onChange={(e) => onRegisterFieldChange('lastName', e?.target?.value)}
            margin="normal"
            helperText={errorState.lastNameError && "Last Name is required"}
          />
          <TextField
            error={errorState.emailError}
            label="Email"
            type="text"
            fullWidth
            value={registerState?.email}
            onChange={(e) => onRegisterFieldChange('email', e?.target?.value)}
            margin="normal"
            helperText={errorState.emailError && "Invalid Email."}
          />
          <TextField
            error={errorState.passwordError}
            label="Password"
            type="password"
            fullWidth
            value={registerState?.password}
            onChange={(e) => onRegisterFieldChange('password', e?.target?.value)}
            margin="normal"
            helperText={errorState.passwordError && "Password must be 6 character"}
          />
        </Box>
      </div>
    )
  }
}
