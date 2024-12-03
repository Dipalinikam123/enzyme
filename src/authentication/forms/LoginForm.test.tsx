import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import LoginForm from './LoginForm';
import { TextField } from '@mui/material';

configure({ adapter: new Adapter() });

describe('LoginForm component', () => {

  const mockOnLoginFieldChange = jest.fn();
  const defaultProps = {
    loginState: {
      email: '',
      password: '',
    },
    onLoginFieldChange: mockOnLoginFieldChange,
    errorState: {
      emailError: false,
      passwordError: false
    }
  }

  test('should render without crashing', () => {
    const wrapper = shallow(<LoginForm {...defaultProps} />)
    expect(wrapper.exists()).toBe(true);
  });
  it('should render two TextField components', () => {
    const wrapper = shallow(<LoginForm {...defaultProps} />);
    expect(wrapper.find(TextField)).toHaveLength(2);
  });

  it('should display email error message when emailError is true', () => {
    const wrapper = shallow(
      <LoginForm
        {...defaultProps}
        errorState={{ emailError: true, passwordError: false }}
      />
    );
    const emailField = wrapper.find(TextField).at(0);
    expect(emailField.prop('error')).toBe(true);
    expect(emailField.prop('helperText')).toBe('Invalid Email.');
  });

  it('should display password error message when passwordError is true', () => {
    const wrapper = shallow(
      <LoginForm
        {...defaultProps}
        errorState={{ emailError: false, passwordError: true }}
      />
    );
    const passwordField = wrapper.find(TextField).at(1);
    expect(passwordField.prop('error')).toBe(true);
    expect(passwordField.prop('helperText')).toBe('Password must be 6 character');
  });

  it('should call onLoginFieldChange when email is changed', () => {
    const wrapper = shallow(<LoginForm {...defaultProps} />);
    const emailField = wrapper.find(TextField).at(0);

    emailField.simulate('change', { target: { value: 'test@example.com' } });
    expect(mockOnLoginFieldChange).toHaveBeenCalledWith('email', 'test@example.com');
  });

  it('should call onLoginFieldChange when password is changed', () => {
    const wrapper = shallow(<LoginForm {...defaultProps} />);
    const passwordField = wrapper.find(TextField).at(1);

    passwordField.simulate('change', { target: { value: 'password123' } });
    expect(mockOnLoginFieldChange).toHaveBeenCalledWith('password', 'password123');
  });
});