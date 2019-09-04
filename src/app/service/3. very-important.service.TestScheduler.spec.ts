import {TestBed} from '@angular/core/testing';

import {asyncScheduler, from, of, VirtualTimeScheduler} from 'rxjs';
import {concatMap, delay, switchMap} from 'rxjs/operators';
import {VeryImportantServiceVTS} from './2. very-important.service.VirtualTimeScheduler';

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

  describe('getSearchResults', () => {

    it('should call this.http.get and get result', () => {
      const scheduler = new VirtualTimeScheduler();
      const input$ = from(['aaa', 'aaab', 'aaabc']).pipe(
        concatMap((value, index) => {
          switch (index) {
            case 0: // will not pass debounce
              return of({target: {value: 'aaa'}}).pipe(delay(100, scheduler));
            case 1: // will pass debounce
              return of({target: {value: 'aaab'}}).pipe(delay(500, scheduler));
            case 2: // will pass debounce
              return of({target: {value: 'aaabc'}}).pipe(delay(2500, scheduler));
          }
        }));

      const result = [];
      service.http = {get: () => of('42', scheduler)};

      const searchResults$ = service.getSearchResults(
        input$,
        scheduler);

      searchResults$.subscribe({
        next: (value) => {console.log('next', value); result.push(value)}
      });

      scheduler.flush();

      console.log('result ', result);
      expect(result).toEqual(['42', '42']);
    });
  });
});
