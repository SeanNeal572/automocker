export type MockFunction<Framework extends 'jest' | 'sinon', Args extends any[] = any[], ReturnType = any> = Framework extends 'sinon'
  ? sinon.SinonStub<Args, ReturnType>
  : Framework extends 'jest'
  ? jest.Mock<ReturnType, Args>
  : never
