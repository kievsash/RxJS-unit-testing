import {TestBed} from '@angular/core/testing';

import {asyncScheduler, of, VirtualTimeScheduler} from 'rxjs';
import {delay} from 'rxjs/operators';
import {VeryImportantServiceVTS} from '../mine_services/2. very-important.service.VirtualTimeScheduler';
import {timeRange} from 'rxjs-toolbox';
import {HttpClient} from '@angular/common/http';

xdescribe('Module 2: VirtualTimeScheduler', () => {
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

      // subscribe to $range and add all values to array
      // then call scheduler.flush()
      // and then expect() to check result

    });
  });

  describe('getData', () => {
    it('should emit 3 specific values', () => {
      const scheduler = new VirtualTimeScheduler();
      service.http = {get: () => of(42, scheduler)};

      const range$ = service.getData(30, scheduler);
      const result = [];

      // subscribe to $range and add all values to array
      // then call scheduler.flush()
      // and then expect() to check result
    });
  });

  describe('watchTwoEmissions', () => {
    it('should merge values', () => {
      const scheduler = new VirtualTimeScheduler();
      service.searchStringChange$ = of('value1').pipe(delay(10, scheduler));
      service.paginationChange$ = of(1).pipe(delay(15, scheduler));

      const range$ = service.watchTwoEmissions();
      const result = [];
      // subscribe to $range and add all values to array
      // then call scheduler.flush()
      // and then expect() to check result
    });
  });

  describe('getData (with AsyncScheduler.delegate trick)', () => {

    it('should emit 3 specific values', () => {
      const virtScheduler = new VirtualTimeScheduler();

      // use trick with AsyncScheduler.delegate (assign virtScheduler)
      // call function: const range$ = service.getData(30)
      // subscribe to $range and add all values to array
      // then call scheduler.flush()
      // and then expect() to check result
      // do not forget to assign undefined to AsyncScheduler.delegate

    });
  });

  describe('getSearchResults (with AsyncScheduler.delegate trick)', () => {

    it('should call this.http.get twice and get result twice', () => {
      const scheduler = new VirtualTimeScheduler();

      // timeRage helper function creates observable
      // to emulate user text input
      // that emits a few values with specified delays
      const input$ = timeRange([
        {value: {target: {value: 'aaa'}}, delay: 100},
        {value: {target: {value: 'aaab'}}, delay: 500},
        {value: {target: {value: 'aaabc'}}, delay: 1500},
      ], true);
      service.http = {get: () => of('42', scheduler)};

      // use trick with AsyncScheduler.delegate (assign virtScheduler)
      // call function: searchResults$ = service.getSearchResults(input$);
      // subscribe to searchResults$ and add all values to array
      // then call scheduler.flush()
      // and then expect() to check result
      // do not forget to assign undefined to AsyncScheduler.delegate
    });
  });
});
