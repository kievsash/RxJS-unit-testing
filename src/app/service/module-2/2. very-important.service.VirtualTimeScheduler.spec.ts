import {TestBed} from '@angular/core/testing';

import { asyncScheduler, of, VirtualTimeScheduler} from 'rxjs';
import {delay} from 'rxjs/operators';
import {VeryImportantServiceVTS} from '../mine_services/2. very-important.service.VirtualTimeScheduler';
import {timeRange} from 'rxjs-toolbox';
import {HttpClient} from '@angular/common/http';

describe('Module 2: VirtualTimeScheduler', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: mockHttp}
      ]
    });
    service = TestBed.inject(VeryImportantServiceVTS);
  });

  describe('getRangeASAP', () => {
    it('should emit 4 specific values', () => {
      const scheduler = new VirtualTimeScheduler();

      const range$ = service.getRangeASAP(scheduler);
      const result = [];
      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      scheduler.flush();
      expect(result).toEqual([0, 1, 2, 3]);
    });
  });

  describe('getData', () => {
    it('should emit 3 specific values', () => {
      const scheduler = new VirtualTimeScheduler();
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

  describe('watchTwoEmissions', () => {
    it('should merge values', () => {
      const scheduler = new VirtualTimeScheduler();
      service.searchStringChange$ = of('value1').pipe(delay(10, scheduler));
      service.paginationChange$ = of(1).pipe(delay(15, scheduler));

      const range$ = service.watchTwoEmissions();
      const result = [];
      range$.subscribe({
        next: (value) => result.push(value)
      });

      scheduler.flush();
      expect(result).toEqual(['value1', 1]);
    });
  });

});
