import React from 'react';
import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import { Modal, Button, Typography } from '@mui/material';
import RegisterForm from '../forms/RegisterForm';
import LoginForm from '../forms/LoginForm';
import RegisterModel from './RegisterModel';
configure({ adapter: new Adapter() });

describe('RegisterModel Component', () => {
  let wrapper: any;
  const mockProps = {
    handleOpen: jest.fn(),
    handleClose: jest.fn(),
    handleFlag: jest.fn(),
    registerHandler: jest.fn(),
    loginHandler: jest.fn(),
    open: true,
    modalFlag: true,
    registerState: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    loginState: {
      email: '',
      password: '',
    },
    errorState: {
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false,
    },
    onRegisterFieldChange: jest.fn(),
    onLoginFieldChange: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<RegisterModel {...mockProps} />);
  });

  it('should render without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the `RegisterForm` when modalFlag is true', () => {
    wrapper.setProps({ modalFlag: true });
    expect(wrapper.find(RegisterForm).exists()).toBe(true);
    expect(wrapper.find(LoginForm).exists()).toBe(false);
  });

  it('should display the `LoginForm` when modalFlag is false', () => {
    wrapper.setProps({ modalFlag: false });
    expect(wrapper.find(LoginForm).exists()).toBe(true);
    expect(wrapper.find(RegisterForm).exists()).toBe(false);
  });

});
