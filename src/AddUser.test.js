import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import AddUser from './AddUser';

configure({ adapter: new Adapter() });


describe('AddUser Component', () => {
  it('should render the form with initial values', () => {
    const wrapper = shallow(<AddUser />);
    expect(wrapper.find('input[name="Name"]').props().value).toBe('');
    expect(wrapper.find('input[name="Email"]').props().value).toBe('');
    expect(wrapper.find('button').text()).toBe('Submit');
  });

  it('should display "User added successfully" when valid input is provided', () => {
    const wrapper = shallow(<AddUser />);
    const instance = wrapper.instance();
    const event = { preventDefault: jest.fn() }
    instance.handleSubmit(event)

    const eve = {
      target: {
        value: '123'
      }
    }
    instance.handleChange(eve, 'name')
    // for cover this  onChange={(e) => this.handleChange(e, 'name')}
    wrapper.find('input[name="Name"]').simulate('change', { target: { value: 'John Doe' } });
    wrapper.find('input[name="Email"]').simulate('change', { target: { value: 'john@example.com' } });
    wrapper.update()

    //  to cover this   this.setState({
    //  message: 'User added successfully',
    //user: { name: '', email: '' }
    //  });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.find('p').text()).toBe('User added successfully');
  });

  it('should display "Name field is required" when name is empty', () => {
    const wrapper = shallow(<AddUser />);

    wrapper.find('input[name="Name"]').simulate('change', { target: { value: '' } });
    wrapper.find('input[name="Email"]').simulate('change', { target: { value: 'john@example.com' } });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });

    expect(wrapper.find('p').text()).toBe('Name field is required');
  });

  // it('should clear the user state after form submission', () => {
  //   const wrapper = shallow(<AddUser />);

  //   wrapper.find('input[name="Name"]').simulate('change', { target: { value: 'John Doe' } });
  //   wrapper.find('input[name="Email"]').simulate('change', { target: { value: 'john@example.com' } });

  //   wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
  //   wrapper.update()

  //   expect(wrapper.find('input[name="Name"]').props().value).toBe('');
  //   expect(wrapper.find('input[name="Email"]').props().value).toBe('');
  // });
})
