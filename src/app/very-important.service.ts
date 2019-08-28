import {Injectable} from '@angular/core';
import {asapScheduler, asyncScheduler, merge, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {delay, repeatWhen, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeryImportantService {

  searchStringChange$ = new Subject();
  paginationChange$ = new Subject();

  constructor(private http: HttpClient) {
  }

  getRangeASAP() {
    return of(0, 1, 2, 3, asapScheduler); // emits 0..1..2..3
  }

  getRangeASYNC() {
    return of(0, 1, 2, 3, asyncScheduler); // emits 0..1..2..3
  }

  getData(timeSec) {
    this.http.get('some_url')
      .pipe(
        repeatWhen((n) => n.pipe(
          delay(timeSec * 1000),
          take(2)
        ))
      );
  }

  watchTwoEmissions() {
    return merge(
      this.searchStringChange$,
      this.paginationChange$
    );
  }
}
