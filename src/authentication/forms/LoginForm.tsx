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
    const { loginState, onLoginFieldChange, errorState } = this.props
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


{/* <input placeholder='Enter your password' type={this.state.iconFlag ? 'password' : 'text'} />
{this.state.iconFlag ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />} */}

// let wrapper: any;

//   // Initialize wrapper for each test
//   beforeEach(() => {
//     wrapper = shallow(<ChildClass />);
//   });

// it('should render input with type "password" when iconFlag is true', () => {
//   wrapper.setState({ iconFlag: true }); // Update the state
//   const input = wrapper.find('input');
//   expect(input.prop('type')).toBe('password');
// });

// it('should render input with type "text" when iconFlag is false', () => {
//   wrapper.setState({ iconFlag: false }); // Update the state
//   const input = wrapper.find('input');
//   expect(input.prop('type')).toBe('text');
// });

// it('should render `RemoveRedEyeIcon` when iconFlag is true', () => {
//   wrapper.setState({ iconFlag: true }); // Update the state
//   expect(wrapper.find(RemoveRedEyeIcon).exists()).toBe(true);
//   expect(wrapper.find(VisibilityOffIcon).exists()).toBe(false);
// });

// it('should render `VisibilityOffIcon` when iconFlag is false', () => {
//   wrapper.setState({ iconFlag: false }); // Update the state
//   expect(wrapper.find(VisibilityOffIcon).exists()).toBe(true);
//   expect(wrapper.find(RemoveRedEyeIcon).exists()).toBe(false);
// });










