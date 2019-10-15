import {TestBed} from '@angular/core/testing';

import {asyncScheduler, of} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';
import {VeryImportantService} from './1.very-important.service';
import {HttpClient} from '@angular/common/http';
import {VeryImportantServiceTS} from './3. very-important.service.TestScheduler';

describe('VeryImportantService - with TestScheduler', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    service = new VeryImportantService(mockHttp);
    mockHttp = {get: () => of(42, asyncScheduler)};
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: mockHttp}
      ]
    });
    service = TestBed.get(VeryImportantServiceTS);
  });

  describe('getData (use TestScheduler as VirtualTimeScheduler)', () => {
    it('should emit 3 specific values', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);
      scheduler.maxFrames = Number.POSITIVE_INFINITY;

      service.http = {get: () => of(42, scheduler)};

      const range$ = service.getData(30, scheduler);
      const result = [];

      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      scheduler.flush();
      expect(result).toEqual([42, 42, 42]);
    });
  });

  describe('getData (TestScheduler with marbles)', () => {
    it('should emit 3 values', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);
      (asyncScheduler.constructor as any).delegate = scheduler;

      const marbleValues = {a: 42};
      service.http = {get: () => scheduler.createColdObservable('(a|)', marbleValues)};

      const expectedMarble = 'a-a-(a|)';

      scheduler.expectObservable(service.getData(0.02)).toBe(expectedMarble, marbleValues);

      scheduler.flush();

      (asyncScheduler.constructor as any).delegate = undefined;
    });
  });

  describe('getRangeASAP (with trick)', () => {
    it('should emit 4 specific values (with trick)', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);
      (asyncScheduler as any).constructor.delegate = scheduler;

      const range$ = service.getRangeASAP();
      const result = [];
      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      scheduler.flush();
      expect(result).toEqual([0, 1, 2, 3]);

      (asyncScheduler as any).constructor.delegate = undefined;
    });
  });

  describe('getRangeASAP (with trick and marbles)', () => {
    it('should emit 4 specific values (with trick)', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);
      (asyncScheduler as any).constructor.delegate = scheduler;

      const marbleValues = {a: 0, b: 1, c: 2, d: 3};
      const expectedMarble = '(abcd|)';

      scheduler.expectObservable(service.getRangeASAP()).toBe(expectedMarble, marbleValues);

      scheduler.flush();

      (asyncScheduler as any).constructor.delegate = undefined;
    });
  });

  describe('watchTwoEmissions', () => {
    it('should merge values emissions', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);
      (asyncScheduler.constructor as any).delegate = scheduler;

      const marbleValues = {a: 42, b: 13};
      service.searchStringChange$ = scheduler.createColdObservable('--a--|', marbleValues);
      service.paginationChange$ = scheduler.createColdObservable('b--|', marbleValues);

      const expectedMarble = 'b-a--|';

      scheduler.expectObservable(service.watchTwoEmissions()).toBe(expectedMarble, marbleValues);

      scheduler.flush();

      (asyncScheduler.constructor as any).delegate = undefined;
    });
  });

});
