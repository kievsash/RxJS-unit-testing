import {asyncScheduler, of} from 'rxjs';
import {fakeAsync, flushMicrotasks, TestBed, tick} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {timeRange} from 'rxjs-toolbox';
import {VeryImportantService} from '../mine_services/1. very-important.service';

xdescribe('Module 3: VeryImportantService (with fakeAsync)', () => {
  let service;
  let mockHttp;

  beforeEach(() => {
    mockHttp = {get: () => of(42, asyncScheduler)};

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: mockHttp}
      ]
    });
    service = TestBed.inject(VeryImportantService);
  });

  describe('getRangeASAP', () => {
    it('should emit 4 specific values (fakeAsync)', fakeAsync(() => {
      // call service.getRangeASAP(30);
      // subscribe to result observable
      // grab all the values to array
      // make a flushMicrotasks() run
      // check array result with expect()

    }));
  });

  describe('getData', () => {
    it('should emit 3 specific values', fakeAsync(() => {
      // call service.getData(30);
      // subscribe to result observable
      // grab all the values to array
      // make a tick(60*1000+5) ms (+5ms for stability)
      // check array result with expect()


    }));
  });

  describe('getSearchResults', () => {

    it('should call this.http.get and get result', fakeAsync(() => {
      // user input emulation observable
      const input$ = timeRange([
        {value: {target: {value: 'aaa'}}, delay: 100},
        {value: {target: {value: 'aaab'}}, delay: 500},
        {value: {target: {value: 'aaabc'}}, delay: 2500},
      ], true);
      service.http = {get: () => of('42', asyncScheduler)};

      // call service.getSearchResults(input$);
      // subscribe to result observable
      // grab all the values to array
      // make a tick(3500) ms (more than 100+500+2500)
      // check array result with expect()

    }));
  });
});
