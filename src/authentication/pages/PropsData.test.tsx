import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import PropsData from './PropsData';


configure({ adapter: new Adapter() });

describe('props', () => {
  test('hello', () => {
    const wrapper= shallow(<PropsData name={'react'}/>)
    expect(wrapper.find('h1').text()).toBe('Hello react');
  });
});