import React from 'react';

export default class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Graceful fallback to light studio CSS canvas if WebGL context is unavailable
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F9FAFB] via-[#EEF2FF]/60 to-[#FFF4F1]/50 p-6">
          <div className="h-44 w-44 rounded-3xl border border-[#4F46E5]/20 bg-white/70 shadow-glass backdrop-blur-xl animate-floatSlow" />
        </div>
      );
    }
    return this.props.children;
  }
}
