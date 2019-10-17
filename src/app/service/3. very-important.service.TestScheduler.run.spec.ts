import {asyncScheduler, of} from 'rxjs';
import {VeryImportantServiceTS} from './3. very-important.service.TestScheduler';
import {TestScheduler} from 'rxjs/testing';

describe('VeryImportantServiceTS (with TestScheduler.run)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantServiceTS(mockHttp);
  });

  describe('getRangeASAP (with trick and marbles)', () => {
    it('should emit 4 specific values (implicit AsyncScheduler.delegate)', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);

      scheduler.run((helpers) => {
        const {expectObservable} = helpers;

        const marbleValues = {a: 0, b: 1, c: 2, d: 3};
        const expectedMarble = '(abcd|)';

        expectObservable(service.getRangeASAP()).toBe(expectedMarble, marbleValues);
      });

    });
  });

  describe('getData (TestScheduler.run with marbles)', () => {
    it('should emit 3 values', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);

      scheduler.run((helpers) =>{
        const { cold, expectObservable } = helpers;
        const marbleValues = {a: 42};
        service.http = {get: () => cold('(a|)', marbleValues)};

        // const expected = 'a 1000ms a 1000ms (a|)';
        const expected = 'a 999ms a 999ms (a|)';

        expectObservable(service.getData(1)).toBe(expected, marbleValues);
      });
    });
  });
});
