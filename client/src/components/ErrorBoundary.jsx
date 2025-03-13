import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el siguiente render muestre la UI de respaldo
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center text-red-500">
          <h2>Ocurrió un error inesperado.</h2>
          <p>Por favor, recarga la página o intenta nuevamente más tarde.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
