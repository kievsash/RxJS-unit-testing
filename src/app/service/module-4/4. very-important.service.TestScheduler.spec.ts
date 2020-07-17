import {TestBed} from '@angular/core/testing';

import {asyncScheduler, of} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';
import {HttpClient} from '@angular/common/http';
import {VeryImportantServiceTS} from '../mine_services/3. very-important.service.TestScheduler';

xdescribe('Module-4: VeryImportantService - with TestScheduler', () => {
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
      service.http = {get: () => of(42, scheduler)};

      // create TestScheduler instance = new TestScheduler(assertion);
      // set scheduler.maxFrames to Infinity
      // call the function service.getData(30, scheduler);
      // subscribe to result observable
      // grab values to array
      // call scheduler.flush()
      // run expect() to check values in array

    });
  });

  describe('getRangeASAP (with trick)', () => {
    it('should emit 4 specific values (with trick)', () => {
      const assertion = (actual, expected) => {
        expect(actual).toEqual(expected);
      };
      const scheduler = new TestScheduler(assertion);
      (asyncScheduler as any).constructor.delegate = scheduler;

      // create TestScheduler instance = new TestScheduler(assertion);
      // call the function service.getRangeASAP()
      // subscribe to result observable
      // grab values to array
      // call scheduler.flush()
      // run expect() to check values in array
      // do not forget to a assign as (asyncScheduler as any).constructor.delegate = undefined

    });
  });


});
