import { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";

export default class ErrorBoundary extends Component {
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
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    //@ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            display: "grid",
            placeContent: "center",
            height: "100vh",
          }}
        >
          <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            We didn't expect this to happen, our sincere apologies we will
            resolve the issue shortly.
          </Alert>
        </div>
      );
    }

    return this.props.children;
  }
}
