import { configure, shallow } from 'enzyme';  // Use 'mount' instead of 'shallow' for lifecycle access
import Adapter from 'enzyme-adapter-react-16';
import ApiComponent from './ApiComponent';

configure({ adapter: new Adapter() });

describe('ApiComponent testing', () => {
  let mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      description: 'This is the description for product 1.',
      category: 'Category 1',
      price: 10,
      image: 'https://via.placeholder.com/150',
      expanded: false,
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'This is the description for product 2.',
      category: 'Category 2',
      price: 20,
      image: 'https://via.placeholder.com/150',
      expanded: false,
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
    const wrapper = shallow(<ApiComponent />);

    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();

    const stateProducts = wrapper.state('products');
    console.log("---stateProducts1---", stateProducts)

    expect(stateProducts).toHaveLength(2);
    expect(stateProducts[0].title).toBe('Product 1');

  });
  test('should handle API error', async () => {
    const mockErrorMessage = 'Error fetching products:';
    global.fetch = jest.fn(() =>
      Promise.reject(new Error(mockErrorMessage))
    );

    const wrapper = shallow(<ApiComponent />);

    await new Promise((resolve) => setTimeout(resolve, 0));

    wrapper.update();
    const state = wrapper.state();
    console.log('---state---', state);

    // expect(state.error).toBe(mockErrorMessage); 
    // expect(wrapper.text()).toContain(mockErrorMessage);
  });

});
