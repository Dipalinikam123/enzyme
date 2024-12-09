import React, { Component } from 'react';

class AddUser extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      user: {
        name: '',
        email: ''
      },
      message: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    const { name } = this.state.user;

    if (name.trim() !== '') {
      this.setState({
        message: 'User added successfully',
        user: { name: '', email: '' }
      });
    } else {
      this.setState({
        message: 'Name field is required'
      });
    }
  };

  // Handle input changes
  handleChange = (event, name) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      user: { ...prevState.user, [name]: value }
    }));
  };

  render() {
    const { name, email } = this.state.user;
    const { message } = this.state;

    return (
      <div>
        <h1>Add User</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="Name"
            value={name}
            onChange={(e) => this.handleChange(e, 'name')}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="Email"
            value={email}
            onChange={(e) => this.handleChange(e, 'email')}
          />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }
}

export default AddUser;
