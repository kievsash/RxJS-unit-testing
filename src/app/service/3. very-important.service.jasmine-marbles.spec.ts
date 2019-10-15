
import {asyncScheduler, of} from 'rxjs';
import {VeryImportantServiceTS} from './3. very-important.service.TestScheduler';
import { getTestScheduler, cold } from 'jasmine-marbles';

describe('VeryImportantServiceTS (with jasmine-marbles)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantServiceTS(mockHttp);
  });

  describe('getData (TestScheduler with marbles)', () => {
    it('should emit 3 values', () => {

      (asyncScheduler.constructor as any).delegate = getTestScheduler();

      const marbleValues = {a: 42};
      service.http = {get: () => cold('(a|)', marbleValues)};

      const expectedObservable = cold('a-a-(a|)', marbleValues);

      expect(service.getData(0.02)).toBeObservable(expectedObservable);

      (asyncScheduler.constructor as any).delegate = undefined;
    });
  });

  describe('watchTwoEmissions', () => {
    it('should merge values emissions', () => {

      (asyncScheduler.constructor as any).delegate = getTestScheduler();

      const marbleValues = {a: 42, b: 13};
      service.searchStringChange$ = cold('--a--|', marbleValues);
      service.paginationChange$ =   cold('b--|', marbleValues);

      const expectedObservable = cold('b-a--|', marbleValues);
      expect(service.watchTwoEmissions()).toBeObservable(expectedObservable);

      (asyncScheduler.constructor as any).delegate = undefined;
    });
  });
});
