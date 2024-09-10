import { DependencyClass } from './classes/DependencyClass'
import { ParentClass } from './classes/ParentClass'
import { AutoMocker } from '../AutoMocker'
import Sinon from 'sinon'

describe('AutoMocker', () => {
  describe('with jest', () => {
    it('createClassMockInstance should create an instance of the class with mocked functions', () => {
      const mocker = AutoMocker.createJestMocker(jest)
      const instance = mocker.createMockInstance(DependencyClass)

      const parentClass = new ParentClass(instance)
      instance.returnRandomNumber.mockReturnValue(2)

      const value = parentClass.sum()
      expect(value).toEqual(3)
    })
  })

  describe('with sinon', () => {
    it('createClassMockInstance should create an instance of the class with mocked functions', () => {
      const mocker = AutoMocker.createSinonMocker(Sinon)
      const instance = mocker.createMockInstance(DependencyClass)

      const parentClass = new ParentClass(instance)
      instance.returnRandomNumber.returns(2)

      const value = parentClass.sum()
      expect(value).toEqual(3)
    })
  })
})
