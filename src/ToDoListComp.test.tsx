import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Table, TableCell, TextField } from '@mui/material';
import ToDoListComp from './ToDoListComp';

configure({ adapter: new Adapter() });


describe('ToDoList Component', () => {
  beforeEach(() => {
    // Clear any previous localStorage data
    localStorage.clear();
  });

  test('Check state', () => {
    const wrapper = shallow(<ToDoListComp />);
    // console.log(wrapper.debug()) // display component data
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.state()).toEqual({ todoArr: [], todo: '' }) //to check state
  });

  test('Table elements', () => {
    const wrapper = shallow(<ToDoListComp />);
    const table = wrapper.find(Table);
    // console.log('---table **',table.debug())
    const expectedTexts = ['Id', 'List', 'Action'];
    expect(expectedTexts).toHaveLength(3)
    table.find(TableCell).forEach((cell: any, index: any) => {
      expect(cell.text()).toBe(expectedTexts[index]);
    });
  });

  test('Add button', () => {
    const wrapper = shallow(<ToDoListComp />);
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { });

    wrapper.setState({ todo: 'New Task' });

    wrapper.find('.add-btn').simulate('click');

    expect(wrapper.state('todoArr')).toEqual(['New Task']);
    expect(wrapper.state('todo')).toBe('');

    expect(localStorage.setItem).toHaveBeenCalledWith('todoList', JSON.stringify(['New Task']));
  });
  test('alert when todo input is blank', () => {
    const wrapper = shallow(<ToDoListComp />);

    global.alert = jest.fn();
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { });


    wrapper.setState({ todoArr: [], todo: '' });

    wrapper.find('.add-btn').simulate('click');

    expect(wrapper.state('todoArr')).toEqual([]);
    expect(wrapper.state('todo')).toBe('');
    expect(global.alert).toHaveBeenCalledWith('Input is blank');

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  test('textfield check', () => {
    const wrapper = shallow(<ToDoListComp />);
    wrapper.find(TextField).simulate('change', { target: { value: 'New Task' } })
    expect(wrapper.state('todo')).toBe('New Task')
  });

  test('removes the correct todo item', () => {
    const wrapper = shallow(<ToDoListComp />);

    const mockTodos = ['Task 1', 'Task 2', 'Task 3'];
    wrapper.setState({ todoArr: mockTodos });

    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { });

    wrapper.find('.remove-btn').at(1).simulate('click');

    expect(wrapper.state('todoArr')).toEqual(['Task 1', 'Task 3']);

    expect(localStorage.setItem).toHaveBeenCalledWith('todoList', JSON.stringify(['Task 1', 'Task 3']));

    jest.restoreAllMocks()
  });

  test('componentDidMount', () => {
    const mockData = ['Task 1', 'Task 2', 'Task 3'];
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockData));
    const wrapper = shallow(<ToDoListComp />);

    wrapper.instance().componentDidMount();
    expect(wrapper.state('todoArr')).toEqual(mockData);

  });
  test('componentDidUpdate', () => {
    console.log = jest.fn();
    const wrapper = shallow(<ToDoListComp />);
    wrapper.instance().componentDidUpdate()
    expect(console.log).toHaveBeenCalledWith('------componentDidUpdate----')
  });
  test('shouldComponentUpdate', () => {
    console.log = jest.fn();
    const wrapper = shallow(<ToDoListComp />);
    wrapper.instance().shouldComponentUpdate()
    expect(console.log).toHaveBeenCalledWith('------shouldComponentUpdate----')
  });

  test('componentDidCatch', () => {
    console.log = jest.fn();
    const wrapper = shallow(<ToDoListComp />);
    wrapper.instance().componentDidCatch();
    expect(console.log).toHaveBeenCalledWith('-----componentDidCatch-----');
  });
});