/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';

declare module 'vitest' {
  export interface TestContext {
    mockFetch: jest.Mock;
  }
}

declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
    interface AsymmetricMatchersContaining extends jest.Matchers<void, any> {}
  }
}

// Extend expect matchers
interface CustomMatchers<R = unknown> {
  toHaveTextContent: (text: string) => R;
  toBeInTheDocument: () => R;
  toBeVisible: () => R;
}

declare global {
  namespace jest {
    interface Matchers<R> extends CustomMatchers<R> {}
  }
}

declare module '@testing-library/react' {
  export interface RenderOptions {
    wrapper?: React.ComponentType<{children: React.ReactNode}>;
  }
}
