import { Box } from '@mui/material';
import React, { Component } from 'react'
interface State {
  name: string; // Define the expected type for the 'name' prop
}
export default class PropsData extends Component<State> {
  render() {
    const { name } = this.props;
    return (
      <div>
        <h1>Hello {name}</h1>
        
      </div>
    )
  }
}
