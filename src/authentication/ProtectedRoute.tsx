import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';

interface RouteProps {
  component: React.ReactNode;
}

interface RouteState {
  isAuthenticated: boolean;
}

export default class ProtectedRoute extends Component<RouteProps, RouteState> {
  state: RouteState = {
    isAuthenticated: Boolean(localStorage.getItem('token')), 
  };

  render() {
    console.log('-----isAuthenticated', this.state.isAuthenticated)
    const { component } = this.props;
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      return <Navigate to="/unauthorize" />;
    }

    return <>{component}</>;
  }
}
