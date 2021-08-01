/**
 * Error Boundary to catch react component mounting and other react errors
 */

import React, { Component } from 'react';

// Component Imports
import Error from './Error_Unhandled'
import withContext from '../Context/Context';

// Add context to Error page
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

  render() {
    if (this.state.hasError) {
      return <ErrorWithContext /> //if error show Error page
    }

    return this.props.children; 
  }
}

export default ErrorBoundary