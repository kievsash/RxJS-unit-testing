import {TestBed} from '@angular/core/testing';

import {asyncScheduler, of} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';
import {HttpClient} from '@angular/common/http';
import {VeryImportantServiceTS} from '../mine_services/3. very-important.service.TestScheduler';

xdescribe('Module-5: VeryImportantService - with TestScheduler', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: mockHttp}
      ]
    });
    service = TestBed.inject(VeryImportantServiceTS);
  });

  // marbles
  describe('getData (TestScheduler with marbles)', () => {
    it('should emit 3 values', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };

      // create TestScheduler instance
      // assign it to (asyncScheduler.constructor as any).delegate
      // mock service.http with scheduler.createColdObservable function
      // expectedMarble = 'a-a-(a|)';
      // use scheduler.expectObservable for assertion
      // call scheduler.flush
      // do not forget to a assign as (asyncScheduler as any).constructor.delegate = undefined

    });
  });

  describe('getRangeASAP (with trick and marbles)', () => {
    it('should emit 4 specific values (with trick)', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      // create TestScheduler instance
      // assign it to (asyncScheduler.constructor as any).delegate
      // const marbleValues = {a: 0, b: 1, c: 2, d: 3};
      // const expectedMarble = '(abcd|)';
      // use scheduler.expectObservable for assertion
      // call scheduler.flush
      // do not forget to a assign as (asyncScheduler as any).constructor.delegate = undefined


    });
  });

  describe('watchTwoEmissions (marbles)', () => {
    it('should merge values emissions', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };

      // create TestScheduler instance
      // assign it to (asyncScheduler.constructor as any).delegate
      // mock service.searchStringChange$ as scheduler.createColdObservable('--a--|', marbleValues)
      // mock service.paginationChange$ as scheduler.createColdObservable('b--|', marbleValues
      //  expectedMarble = 'b-a--|';
      // use scheduler.expectObservable for assertion
      // call scheduler.flush
      // do not forget to a assign as (asyncScheduler as any).constructor.delegate = undefined

    });
  });

});
