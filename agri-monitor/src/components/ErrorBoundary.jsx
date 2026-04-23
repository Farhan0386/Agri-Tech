import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center bg-red-50 border border-red-200 m-4 rounded-xl">
          <h2 className="text-red-800 font-bold">System Connection Interrupted</h2>
          <p className="text-red-600">Please check your API key and refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;