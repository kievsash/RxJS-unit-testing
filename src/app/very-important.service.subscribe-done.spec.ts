import {TestBed} from '@angular/core/testing';

import {VeryImportantService} from './very-important.service';
import {asyncScheduler, of} from 'rxjs';
import {delay} from 'rxjs/operators';

fdescribe('VeryImportantService', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantService(mockHttp);
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
  describe('getRangeASYNC', () => {
    it('should emit 4 specific values', (done) => {
      const range$ = service.getRangeASYNC();
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
    it('should emit 4 specific values', (done) => {

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
});
