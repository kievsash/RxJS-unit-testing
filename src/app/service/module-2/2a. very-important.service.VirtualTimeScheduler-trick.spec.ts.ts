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

  describe('getRangeASAP (with AsyncScheduler.delegate trick)', () => {
    it('should emit 4 specific values (with trick)', () => {
      const virtScheduler = new VirtualTimeScheduler();
      (asyncScheduler.constructor as any).delegate = virtScheduler;

      const range$ = service.getRangeASAP();
      const result = [];
      range$.subscribe({
        next: (value) => {
          result.push(value);
        }
      });

      virtScheduler.flush();
      expect(result).toEqual([0, 1, 2, 3]);

      (asyncScheduler.constructor as any).delegate = undefined;
    });
  });

  describe('getData (with AsyncScheduler.delegate trick)', () => {

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

  describe('getSearchResults (with AsyncScheduler.delegate trick)', () => {

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

      const searchResults$ = service.getSearchResults(input$);

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
