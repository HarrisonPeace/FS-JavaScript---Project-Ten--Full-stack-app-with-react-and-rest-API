import React, { Component } from 'react';

// Component Imports
import Error from './Error'
import withContext from '../Context/Context';

const ErrorWithContext = withContext(Error);

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorWithContext />
    }

    return this.props.children; 
  }
}

export default ErrorBoundary