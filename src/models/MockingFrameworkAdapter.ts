type MockFunction<Framework extends 'jest' | 'sinon'> = Framework extends 'jest' ? jest.Mock : sinon.SinonStub

export interface MockingFrameworkAdapter<Framework extends 'jest' | 'sinon'> {
  createMockFunction(): MockFunction<Framework>
}
