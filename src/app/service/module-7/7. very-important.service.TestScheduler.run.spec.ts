import {asyncScheduler, of} from 'rxjs';
import {VeryImportantServiceTS} from '../mine_services/3. very-important.service.TestScheduler';
import {TestScheduler} from 'rxjs/testing';

describe('Module 6: VeryImportantServiceTS (with TestScheduler.run)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantServiceTS(mockHttp);
  });

  describe('getRangeASAP (with trick and marbles)', () => {
    it('should emit 4 specific values (implicit AsyncScheduler.delegate)', () => {

      // create TestScheduler instance
      // write test in scheduler.run callback
      // const marbleValues = {a: 0, b: 1, c: 2, d: 3};
      // const expectedMarble = '(abcd|)';
      // use expectObservable helper for assertion


    });
  });

  describe('getData (TestScheduler.run with marbles)', () => {
    it('should emit 3 values', () => {

      // create TestScheduler instance
      // write test in scheduler.run callback
      // mock service.http with cold helper function cold('(a|)', marbleValues)
      // compose expected marble string
      // use expectObservable helper for assertion

    });
  });
});
