import {TestBed} from '@angular/core/testing';

import {asyncScheduler, of} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';
import {HttpClient} from '@angular/common/http';
import {VeryImportantServiceTS} from '../mine_services/3. very-important.service.TestScheduler';

describe('Module-4: VeryImportantService - with TestScheduler', () => {
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

  describe('getRangeASAP (use TestScheduler as VirtualTimeScheduler, with .delegate trick)', () => {
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

});
