"use client";

import { Component, type ReactNode } from "react";

/**
 * Catches errors from loading a custom GLB bottle model (bad URL, fetch/parse
 * failure) and renders a fallback (the procedural bottle) instead of crashing
 * the whole 3D canvas.
 */
export default class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Bottle model failed to load, using fallback:", error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
