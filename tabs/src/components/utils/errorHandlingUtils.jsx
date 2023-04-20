import * as React from 'react'
import toast from 'react-hot-toast';

// Functions to handle success and error alerts
const toasterErrorMessage = (message) => toast.error(message);
const toasterSuccessMessage = (message) => toast.success(message);

// Error boundary class to catch runtime errors for components wrapped with it
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to a error reporting service here
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div>
                    <p>An unexpected error occured. Please try again later.</p>
                </div>
            );
        }
        // Normally, just render children
        return this.props.children;
    }
}

// Typical error handling when sending requests to the backend
function handleBackendRequestBlockErrors (error, triggerConsent) {
    let errorMessage = error?.response?.data?.error || "An error occured!";
      if (errorMessage?.includes("invalid_grant")) {
        triggerConsent(true);
      } else {
        toasterErrorMessage(errorMessage); // TODO: Revisit the error message shown
      }
}

export {
    toasterErrorMessage,
    toasterSuccessMessage,
    ErrorBoundary,
    handleBackendRequestBlockErrors
}