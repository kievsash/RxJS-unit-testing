import {TestBed} from '@angular/core/testing';
import {timeRange} from 'rxjs-toolbox';
import {asyncScheduler, from, of, Subject} from 'rxjs';
import {concatMap, delay, switchMap} from 'rxjs/operators';
import {VeryImportantService} from './1.very-important.service';
import {VeryImportantServiceTS} from './3. very-important.service.TestScheduler';
import {HttpClient} from '@angular/common/http';

describe('VeryImportantService', () => {
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

  describe('getRangeASAP', () => {
    it('should emit 4 specific values', (done) => {
      const range$ = service.getRangeASAP();
      const result = [];
      range$.subscribe({
        next: (value) => {
          result.push(value);
        },
        complete: () => {
          expect(result).toEqual([0, 1, 2, 3]);
          done();
        }
      });
    });
  });

  describe('getData', () => {
    it('should emit 3 specific values', (done) => {
      const range$ = service.getData(0.01);
      const result = [];

      range$.subscribe({
        next: (value) => {
          result.push(value);
        },
        complete: () => {
          expect(result).toEqual([42, 42, 42]);
          done();
        }
      });

    });
  });

  describe('watchTwoEmissions', () => {

    it('should merge values', (done) => {
      service.searchStringChange$ = of('value1').pipe(delay(10));
      service.paginationChange$ = of(1).pipe(delay(15));

      const range$ = service.watchTwoEmissions();
      const result = [];
      range$.subscribe({
        next: (value) => result.push(value),
        complete: () => {
          expect(result).toEqual(['value1', 1]);
          done();
        }
      });
    });
  });

  describe('getSearchResults', () => {
    it('should call this.http.get and get result', (done) => {

      const input$ = timeRange([
        {value: {target: {value: 'aaa'}}, delay: 1},
        {value: {target: {value: 'aaab'}}, delay: 5},
        {value: {target: {value: 'aaabc'}}, delay: 30},
      ], true);

      const debounceTimingMs = 15;
      const result = [];
      service.http = {get: () => of('42', asyncScheduler)};

      const searchResults$ = service.getSearchResults(
        input$,
        debounceTimingMs);

      searchResults$.subscribe({
        next: (value) => result.push(value),
        complete: () => {
          expect(result).toEqual(['42', '42']);
          done();
        }
      });
    });
  });
});
