import Sinon from 'sinon'

export type MockFunction<Args extends any[], ReturnValue, Framework extends 'jest' | 'sinon'> = Framework extends 'sinon'
  ? Sinon.SinonStub<Args, ReturnValue>
  : Framework extends 'jest'
  ? jest.Mock<ReturnValue, Args>
  : never
