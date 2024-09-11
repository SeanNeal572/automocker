import { MockFunction } from './MockFunction'

export interface MockingFrameworkAdapter<Framework extends 'jest' | 'sinon'> {
  createMockFunction(): MockFunction<Framework>
}
