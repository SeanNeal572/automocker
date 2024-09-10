import { JestFrameworkAdapter } from './JestFrameworkAdapter'
import { MockFunction } from './MockedFunction'
import { SinonFrameworkAdapter } from './SinonFrameworkAdapter'

export type MockedClassInstance<TClass, TMockingAdaptor> = {
  [K in keyof TClass]: TClass[K] extends (...args: infer Args) => infer ReturnType
    ? TMockingAdaptor extends JestFrameworkAdapter
      ? MockFunction<Args, ReturnType, 'jest'>
      : TMockingAdaptor extends SinonFrameworkAdapter
      ? MockFunction<Args, ReturnType, 'sinon'>
      : never
    : never
} & TClass
