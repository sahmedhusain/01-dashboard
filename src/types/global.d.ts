
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL?: string;
    readonly VITE_APP_TITLE?: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly MODE: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  const vi: typeof import('vitest')['vi'];
  const describe: typeof import('vitest')['describe'];
  const it: typeof import('vitest')['it'];
  const test: typeof import('vitest')['test'];
  const expect: typeof import('vitest')['expect'];
  const beforeEach: typeof import('vitest')['beforeEach'];
  const afterEach: typeof import('vitest')['afterEach'];
  const beforeAll: typeof import('vitest')['beforeAll'];
  const afterAll: typeof import('vitest')['afterAll'];
}

export {};
