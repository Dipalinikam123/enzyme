import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import DummyApi from './DummyApi';

configure({ adapter: new Adapter() });
describe('ApiComponent testing', () => {
  let mockProducts = [
    {
      id: 1,
      email: 'john.doe@example.com',
      username: 'johndoe',
      name: { firstname: 'John', lastname: 'Doe' },
      phone: '123-456-7890',
    },
    {
      id: 2,
      email: 'jane.doe@example.com',
      username: 'janedoe',
      name: { firstname: 'Jane', lastname: 'Doe' },
      phone: '987-654-3210',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render the component and mock the API call', async () => {
    const wrapper = shallow(<DummyApi />);

    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();

    const stateProducts = wrapper.state('userData');
    console.log("---stateProducts1---", stateProducts)

    expect(stateProducts).toHaveLength(2);
    expect(stateProducts[0].email).toBe('john.doe@example.com');

  });
  test('should handle fetch error and log it to console.error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch users'))
    );

    const wrapper = shallow(<DummyApi />);

    await wrapper.instance().userApi();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching users:',
      expect.any(Error)
    );

    expect(fetch).toHaveBeenCalledTimes(2);

    consoleErrorSpy.mockRestore();
  });
});