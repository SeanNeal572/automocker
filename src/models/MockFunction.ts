import Sinon from 'sinon'

export type MockFunction<Framework extends 'jest' | 'sinon', Args extends any[] = any[], ReturnType = any> = Framework extends 'sinon'
  ? Sinon.SinonStub<Args, ReturnType>
  : Framework extends 'jest'
  ? jest.Mock<ReturnType, Args>
  : never
