import {asyncScheduler, of} from 'rxjs';
import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {timeRange} from 'rxjs-toolbox';
import {VeryImportantService} from './1.very-important.service';

describe('VeryImportantService (with fakeAsync)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    service = new VeryImportantService(mockHttp);
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: mockHttp}
      ]
    });
    service = TestBed.get(VeryImportantService);
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
      const input$ = timeRange([
        {value: {target: {value: 'aaa'}}, delay: 100},
        {value: {target: {value: 'aaab'}}, delay: 500},
        {value: {target: {value: 'aaabc'}}, delay: 2500},
      ], true);

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
