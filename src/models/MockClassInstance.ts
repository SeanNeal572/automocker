import { MockFunction } from './MockFunction'

export type MockClassInstance<TClass, TFramework extends 'jest' | 'sinon'> = {
  [K in keyof TClass]: TClass[K] extends (...args: infer Args) => infer ReturnType ? MockFunction<TFramework, Args, ReturnType> : never
} & TClass
