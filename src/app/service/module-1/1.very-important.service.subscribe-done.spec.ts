import {TestBed} from '@angular/core/testing';
import {asyncScheduler, Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {VeryImportantService} from '../mine_services/1. very-important.service';
import {HttpClient} from '@angular/common/http';

xdescribe('Module-1: subscribe + jasmine done', () => {
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
    service = TestBed.inject(VeryImportantService);
  });

  describe('getRange (with AsyncScheduler)', () => {
    it('should emit 4 specific values', (done) => {
      const range$ = service.getRange();

      // subscribe to range$ to add all values to array
      // and check for final result in complete handler
      // and call done callback
    });
  });

  describe('getRangeASAP', () => {
    it('should emit 4 specific values', (done) => {
      const range$ = service.getRangeASAP();

      const result = [];
      // subscribe to range$ to add all values to array
      // and check for final result in complete handler
      // and call done callback
    });
  });

  describe('getData', () => {
    it('should emit 3 specific values', (done) => {
      const range$ = service.getData(0.01);
      const result = [];
      // mockHttp = {get: () => of(42, asyncScheduler)};


      // subscribe to range$ to add all values to array
      // and check for final result in complete handler
      // and call done callback

    });
  });

  describe('watchTwoEmissions', () => {

    it('should merge values', (done) => {
      service.searchStringChange$ = of('value1').pipe(delay(10));
      service.paginationChange$ = of(1).pipe(delay(15));
      mockHttp = {get: () => of(42, asyncScheduler)};

      const range$ = service.watchTwoEmissions();
      const result = [];
      // subscribe to range$ to add all values to array
      // and check for final result in complete handler
      // and call done callback
    });
  });

});
