import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import LifeCycle from './LifeCycle';

configure({ adapter: new Adapter() });

describe('lifeCycle', () => {
  test('test', () => {
    const wrapper= shallow(<LifeCycle/>)
  });
});