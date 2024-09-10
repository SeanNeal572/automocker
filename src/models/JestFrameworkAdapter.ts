import { MockingFrameworkAdapter } from './MockingFrameworkAdapter'

export interface JestMockingFramework {
  fn: () => jest.Mock
}

export class JestFrameworkAdapter implements MockingFrameworkAdapter<'jest'> {
  constructor(private jest: JestMockingFramework) {}

  createMockFunction(): jest.Mock {
    return this.jest.fn()
  }
}
