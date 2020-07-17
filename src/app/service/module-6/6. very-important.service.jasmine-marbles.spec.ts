import {asyncScheduler, of} from 'rxjs';
import {VeryImportantServiceTS} from '../mine_services/3. very-important.service.TestScheduler';
import { getTestScheduler, cold } from 'jasmine-marbles';

xdescribe('Module 5: VeryImportantServiceTS (with jasmine-marbles)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantServiceTS(mockHttp);
  });

  describe('getData (TestScheduler with marbles)', () => {
    it('should emit 3 values', () => {

      // get TestScheduler instance from jasmine-mabrles with getTestScheduler()
      // assign instance to (asyncScheduler.constructor as any).delegate
      // mock service.http with 'cold'helper function
      // service.http = {get: () => cold('(a|)', marbleValues)};
      // call expect for assertion, expectedObservable = cold('a-a-(a|)', marbleValues)
      // do not forget to a assign as (asyncScheduler as any).constructor.delegate = undefined

    });
  });

  describe('watchTwoEmissions', () => {
    it('should merge values emissions', () => {

      // get TestScheduler instance from jasmine-mabrles with getTestScheduler()
      // assign instance to (asyncScheduler.constructor as any).delegate
      // marbleValues = {a: 42, b: 13};
      // mock service.searchStringChange$ = cold('--a--|', marbleValues);
      // mock service.paginationChange$ =   cold('b--|', marbleValues);
      // expectedObservable = cold('b-a--|', marbleValues)
      // call expect for assertion,
      // do not forget to a assign as (asyncScheduler as any).constructor.delegate = undefined

    });
  });
});
