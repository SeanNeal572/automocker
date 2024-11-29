import { MockingFrameworkAdapter } from './MockingFrameworkAdapter'

export interface SinonMockingFramework {
  stub: sinon.SinonStubStatic
}

export class SinonFrameworkAdapter implements MockingFrameworkAdapter<'sinon'> {
  constructor(private sinon: SinonMockingFramework) {}

  createMockFunction() {
    return this.sinon.stub()
  }
}
