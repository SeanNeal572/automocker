import { JestFrameworkAdapter, JestMockingFramework, MockingFrameworkAdapter, SinonFrameworkAdapter, SinonMockingFramework } from './models'

type Class<T> = new (...args: any[]) => T

type MockClassInstance<TClass, TFramework extends 'jest' | 'sinon'> = TFramework extends 'jest'
  ? jest.Mocked<TClass>
  : sinon.SinonStubbedInstance<TClass>

/** A utility allowing for hollow mock class instance creation. */
export class AutoMocker<T extends 'jest' | 'sinon'> {
  constructor(private mockingFrameworkAdapter: MockingFrameworkAdapter<T>) {}

  /** Creates a class instance of the input type, mocking all of its functions */
  createMockInstance<K>(TheClass: Class<K>): MockClassInstance<K, T> {
    let classInstance: Partial<MockClassInstance<K, T>> = {}

    let currentPrototype = TheClass.prototype

    const allFunctionNames = new Set<keyof K>()

    while (currentPrototype && currentPrototype !== Object.prototype) {
      Object.getOwnPropertyNames(currentPrototype)
        .filter((name) => {
          try {
            return typeof currentPrototype[name] === 'function' && name !== 'constructor'
          } catch (e) {
            return false
          }
        })
        .forEach((name) => {
          allFunctionNames.add(name as keyof K)
        })

      currentPrototype = Object.getPrototypeOf(currentPrototype)
    }
    allFunctionNames.forEach((functionName) => {
      classInstance[functionName] = this.mockingFrameworkAdapter.createMockFunction() as MockClassInstance<K, T>[keyof K]
    })

    return classInstance as MockClassInstance<K, T>
  }

  static createJestMocker(jest: JestMockingFramework): AutoMocker<'jest'> {
    return new AutoMocker(new JestFrameworkAdapter(jest))
  }

  static createSinonMocker(sinon: SinonMockingFramework): AutoMocker<'sinon'> {
    return new AutoMocker(new SinonFrameworkAdapter(sinon))
  }
}
