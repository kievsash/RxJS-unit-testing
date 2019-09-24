import {asapScheduler, asyncScheduler, from, of, VirtualTimeScheduler} from 'rxjs';
import {VeryImportantServiceTS} from './3. very-important.service.TestScheduler';
import {TestScheduler} from 'rxjs/testing';
import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {concatMap, delay} from 'rxjs/operators';

describe('VeryImportantServiceTS (with rxjs-marbles)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantServiceTS(mockHttp);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: mockHttp}
      ]
    });
    service = TestBed.get(VeryImportantServiceTS);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRangeASAP', () => {
    it('should emit 4 specific values (fakeAsync)', fakeAsync(() => {

      const range$ = service.getRangeASAP();
      const result = [];
      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      flushMicrotasks();
      expect(result).toEqual([0, 1, 2, 3]);
    }));
  });

  describe('getData', () => {
    it('should emit 3 specific values', fakeAsync(() => {

      const range$ = service.getData(30);
      const result = [];

      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      tick(60005);
      // 60000 = value + 30000ms + value + 30000ms + value + 5ms(to be sure)

      expect(result).toEqual([42, 42, 42]);
    }));
  });

  describe('getSearchResults', () => {

    it('should call this.http.get and get result', fakeAsync(() => {
      const input$ = from(['aaa', 'aaab', 'aaabc']).pipe(
        concatMap((value, index) => {
          switch (index) {
            case 0: // will not pass debounce
              return of({target: {value: 'aaa'}}).pipe(delay(100));
            case 1: // will pass debounce
              return of({target: {value: 'aaab'}}).pipe(delay(500));
            case 2: // will pass debounce
              return of({target: {value: 'aaabc'}}).pipe(delay(2500));
          }
        }));

      const result = [];
      service.http = {get: () => of('42', asyncScheduler)};

      const searchResults$ = service.getSearchResults(input$);

      searchResults$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      tick(3500);

      expect(result).toEqual(['42', '42']);
    }));
  });
});
