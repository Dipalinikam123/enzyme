import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  const wrapper = shallow(<App />); //to render component use shallow
  // console.log(wrapper.debug()) // display component data
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.exists('.App')).toEqual(true) // to check className

  // expect(wrapper.find(ApiComponent).length).toBe(1);


});
