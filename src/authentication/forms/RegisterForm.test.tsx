import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import RegisterForm from './RegisterForm';
import { TextField } from '@mui/material';

configure({ adapter: new Adapter() });

describe('RegisterForm component', () => {
  const mockOnRegisterFieldChange = jest.fn();

  const defaultProps = {
    registerState: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    errorState: {
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: false
    },
    onRegisterFieldChange: mockOnRegisterFieldChange
  }

  test('RegisterForm Components', () => {
    const wrapper = shallow(<RegisterForm {...defaultProps} />)
    expect(wrapper.exists()).toBe(true)
  });
  test('Fields', () => {
    const wrapper = shallow(<RegisterForm {...defaultProps} />)
    expect(wrapper.find(TextField)).toHaveLength(4)
  });

  test('FirstName required error message', () => {
    const wrapper = shallow(<RegisterForm {...defaultProps} errorState={{
      firstNameError: true,
      lastNameError: false,
      emailError: false,
      passwordError: false
    }} />)

    const fNameField = wrapper.find(TextField).at(0)
    expect(fNameField.prop('error')).toBe(true)
    expect(fNameField.prop('helperText')).toBe('First Name is required')
  });
  test('LastName required error message', () => {
    const wrapper = shallow(<RegisterForm {...defaultProps} errorState={{
      firstNameError: false,
      lastNameError: true,
      emailError: false,
      passwordError: false
    }} />)
    const lNameField = wrapper.find(TextField).at(1)
    expect(lNameField.prop('error')).toBe(true)
    expect(lNameField.prop('helperText')).toBe('Last Name is required')
  });
  test('Email required error message', () => {
    const wrapper = shallow(<RegisterForm {...defaultProps} errorState={{
      firstNameError: false,
      lastNameError: false,
      emailError: true,
      passwordError: false
    }} />)
    const emailField = wrapper.find(TextField).at(2)
    expect(emailField.prop('error')).toBe(true);
    expect(emailField.prop('helperText')).toBe('Invalid Email.')
  });
  test('Password required error message', () => {
    const wrapper = shallow(<RegisterForm {...defaultProps} errorState={{
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      passwordError: true
    }} />)
    const emailField = wrapper.find(TextField).at(3)
    expect(emailField.prop('error')).toBe(true);
    expect(emailField.prop('helperText')).toBe('Password must be 6 character')
  });
  test('FirstName onChangeHandler', () => {
    const wrapper = shallow(<RegisterForm {...defaultProps} />)
    const fNameChange = wrapper.find(TextField).at(0)
    fNameChange.simulate('change', { target: { value: 'pooja' } })
    expect(mockOnRegisterFieldChange).toHaveBeenCalledWith('firstName', 'pooja')
  });
  test('LastName onChangeHandler', () => {
    const wrapper=shallow(<RegisterForm {...defaultProps}/>)
    const lNameChange = wrapper.find(TextField).at(1)
    lNameChange.simulate('change', { target: { value: 'nikam' } })
    expect(mockOnRegisterFieldChange).toHaveBeenCalledWith('lastName', 'nikam')
  });
  test('Email onChangeHandler', () => {
    const wrapper=shallow(<RegisterForm {...defaultProps}/>)
    const emailChange = wrapper.find(TextField).at(2)
    emailChange.simulate('change', { target: { value: 'd@gmail.com' } })
    expect(mockOnRegisterFieldChange).toHaveBeenCalledWith('email', 'd@gmail.com')
  });
  test('Password onChangeHandler', () => {
    const wrapper=shallow(<RegisterForm {...defaultProps}/>)
    const passwordChange = wrapper.find(TextField).at(3)
    passwordChange.simulate('change', { target: { value: '123456780' } })
    expect(mockOnRegisterFieldChange).toHaveBeenCalledWith('password', '123456780')
  });
});



