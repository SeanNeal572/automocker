import {
  JestFrameworkAdapter,
  JestMockingFramework,
  MockedClassInstance,
  MockingFrameworkAdapter,
  SinonFrameworkAdapter,
  SinonMockingFramework,
} from './models'

type Class<T> = new (...args: any[]) => T

/** A utility allowing for hollow mock class instance creation. */
export class AutoMocker<T extends MockingFrameworkAdapter<'jest' | 'sinon'>> {
  constructor(private mockingFrameworkAdapter: T) {}

  /** Creates a class instance of the input type, mocking all of its functions */
  createMockInstance<K>(TheClass: Class<K>): MockedClassInstance<K, T> {
    let classInstance: Partial<MockedClassInstance<K, T>> = {}

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
      classInstance[functionName] = this.mockingFrameworkAdapter.createMockFunction() as MockedClassInstance<K, T>[keyof K]
    })

    return classInstance as MockedClassInstance<K, T>
  }

  static createJestMocker(jest: JestMockingFramework) {
    return new AutoMocker(new JestFrameworkAdapter(jest))
  }

  static createSinonMocker(sinon: SinonMockingFramework) {
    return new AutoMocker(new SinonFrameworkAdapter(sinon))
  }
}
