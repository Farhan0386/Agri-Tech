import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // SOP [advanced feature]: catch component-level crashes and keep the dashboard from blanking out.
    console.error('Agri-Monitor UI error boundary caught an error:', error, errorInfo);
  }

  resetError() {
    this.setState({ hasError: false });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="m-4 rounded-2xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-red-900">System Connection Interrupted</h2>
          <p className="mt-2 text-sm text-red-700">A component failed to render. Refresh the app or retry below after checking your API key.</p>
          <button type="button" onClick={this.resetError} className="btn-primary mt-6 bg-red-700 hover:bg-red-600">
            Retry Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;