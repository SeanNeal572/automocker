import { MockFunction } from './MockedFunction'

export interface MockingFrameworkAdapter<Framework extends 'jest' | 'sinon'> {
  createMockFunction(): MockFunction<any[], any, Framework>
}
