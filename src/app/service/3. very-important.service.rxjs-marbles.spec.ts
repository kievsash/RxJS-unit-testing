import {asapScheduler, asyncScheduler, from, of} from 'rxjs';
import {VeryImportantServiceTS} from './3. very-important.service.TestScheduler';
import {marbles} from 'rxjs-marbles/jasmine';
import {fakeSchedulers} from 'rxjs-marbles/jasmine/angular';
import {timeRange} from 'rxjs-toolbox';
import {fakeAsync, flushMicrotasks, tick} from '@angular/core/testing';
import {concatMap, delay} from 'rxjs/operators';

describe('VeryImportantServiceTS (with rxjs-marbles)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantServiceTS(mockHttp);
  });

  describe('getRangeASAP (rxjs-marbles)', () => {
    it('should emit 4 specific values ',
      marbles((m) => {
        const marbleValues = {a: 0, b: 1, c: 2, d: 3};
        const expectedMarble = '(abcd|)';

        m.expect(service.getRangeASAP()).toBeObservable(expectedMarble, marbleValues);
      })
    );

  });

  describe('getData (rxjs-marbles with marbles)', () => {
    it('should emit 3 values', marbles((m) => {
        const marbleValues = {a: 42};
        service.http = {get: () => m.cold('(a|)', marbleValues)};

        // const expected = 'a 1000ms a 1000ms (a|)';
        const expected = 'a 999ms a 999ms (a|)';

        m.expect(service.getData(1)).toBeObservable(expected, marbleValues);

      })
    );
  });

  describe('getSearchResults (rxjs-marbles fakeSchedulers)', () => {

    it('should call this.http.get and get result', fakeSchedulers(() => {
      const input$ = timeRange([
        {value: {target: {value: 'aaa'}}, delay: 100},
        {value: {target: {value: 'aaab'}}, delay: 500},
        {value: {target: {value: 'aaabc'}}, delay: 1500},
      ], true);

      const result = [];
      service.http = {get: () => of('42', asyncScheduler)};

      const searchResults$ = service.getSearchResults(input$);

      searchResults$.subscribe((value) => result.push(value));

      tick(3500);

      expect(result).toEqual(['42', '42']);
    }));
  });

  describe('getRangeASAP (asapScheduler test with rxjs-marbles fakeSchedulers)', () => {
    it('should emit 4 specific values (fakeAsync)', fakeSchedulers(() => {

      const range$ = service.getRangeASAP();
      const result = [];
      range$.subscribe((value) => result.push(value));

      tick(1);
      expect(result).toEqual([0, 1, 2, 3]);
    }));
  });
  describe('(rxjs-marbles cases)', () => {

  });

  describe('(rxjs-marbles observe)', () => {

  });
});
