import {TestBed} from '@angular/core/testing';

import {asapScheduler, asyncScheduler, from, of, VirtualTimeScheduler} from 'rxjs';
import {concatMap, delay, switchMap} from 'rxjs/operators';
import {AsapScheduler} from 'rxjs/internal/scheduler/AsapScheduler';
import {VeryImportantServiceVTS} from './2. very-important.service.VirtualTimeScheduler';
import {timeRange} from 'rxjs-toolbox';

describe('VeryImportantServiceVTS', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantServiceVTS(mockHttp);
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

  describe('getRangeASAP (with trick)', () => {
    it('should emit 4 specific values (with trick)', () => {
      const virtScheduler = new VirtualTimeScheduler();
      asapScheduler.schedule = virtScheduler.schedule.bind(
        virtScheduler
      ) as any;

      const range$ = service.getRangeASAP();
      const result = [];
      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      virtScheduler.flush();
      expect(result).toEqual([0, 1, 2, 3]);

      delete asapScheduler.schedule;
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

  describe('getData (AsyncScheduler.delegate)', () => {

    it('should emit 3 specific values', () => {
      const virtScheduler = new VirtualTimeScheduler();
      (asyncScheduler.constructor as any).delegate = virtScheduler;
      service.http = {get: () => of(42, asyncScheduler)};

      const range$ = service.getData(30);
      const result = [];

      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      virtScheduler.flush();
      expect(result).toEqual([42, 42, 42]);

      (asyncScheduler.constructor as any).delegate = undefined;
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

  describe('getSearchResults', () => {

    it('should call this.http.get twice and get result twice', () => {
      const scheduler = new VirtualTimeScheduler();
      const input$ = timeRange([
        {value: {target: {value: 'aaa'}}, delay: 100},
        {value: {target: {value: 'aaab'}}, delay: 500},
        {value: {target: {value: 'aaabc'}}, delay: 1500},
      ], true);
      (asyncScheduler.constructor as any).delegate = scheduler;

      const result = [];
      service.http = {get: () => of('42', scheduler)};

      const searchResults$ = service.getSearchResults(input$, scheduler);

      searchResults$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      scheduler.flush();

      expect(result).toEqual(['42', '42']);
      (asyncScheduler.constructor as any).delegate = undefined;

    });
  });
});
