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

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  test('should render the component and mock the API call', async () => {
    const wrapper = shallow(<DummyApi />);

    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();

    const stateUsers = wrapper.state('userData');
    console.log("---stateProducts1---", stateUsers)

    expect(stateUsers).toHaveLength(2);
    expect(stateUsers[0].email).toBe('john.doe@example.com');
    console.log('-----1-----')

  });
  test('should handle fetch error and log it to console.error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();// mockImplementation-to replace the original functionality of a method or function with a custom implementation during testing.

    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch users'))
    );

    const wrapper = shallow(<DummyApi />);

    await wrapper.instance().userApi();
    wrapper.update()

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching users:',
      expect.any(Error)
    );

    expect(fetch).toHaveBeenCalledTimes(2);

    consoleErrorSpy.mockRestore(); //is a Jest method used to restore the original implementation of a mocked or spied function. It is typically used in conjunction with jest.spyOn()
    console.log('-----2-----')
  });
});



// ex of mockImplementation 
// describe('mocking with spyOn', () => {
//   const math = {
//     add: (a, b) => a + b,
//   };

//   it('should mock the add method', () => {
//     const addSpy = jest.spyOn(math, 'add').mockImplementation((a, b) => a * b); //mockImplementation is used to replace origin implementayion 

//     const result = math.add(2, 3);

//     expect(result).toBe(6); // Mocked behavior
//     expect(addSpy).toHaveBeenCalledTimes(1);

//     addSpy.mockRestore(); restore the original implementation
//     expect(math.add(2, 3)).toBe(5); // Original behavior restored
//   });
// });

//from props 
// let wrapper;
// let users;

// Given('I have a list of users', () => {
//   users = [
//     { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
//     { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
//   ];
// });

// When('I render the user list component', () => {
//   wrapper = shallow(<UserList users={users} />);
// });

// Then('I should see the user names and emails in the table', () => {
//   expect(wrapper.find('td').at(0).text()).toEqual('John Doe');
//   expect(wrapper.find('td').at(1).text()).toEqual('john.doe@example.com');
//   expect(wrapper.find('td').at(2).text()).toEqual('Jane Smith');
//   expect(wrapper.find('td').at(3).text()).toEqual('jane.smith@example.com');
// });


// expect(mockFunc).toHaveBeenCalled() -- The mock function was called at least once

// ==========================================================================
// jest.mock
// Automatically replaces an entire module with a mock version.
// Used for mocking dependencies (e.g., APIs, utility functions, or third-party libraries

// jest.fn
// Creates a standalone mock function.
// Allows you to track calls, arguments, and returned values for testing purposes.

//  jest.restoreAllMocks ==this is used with spyOn