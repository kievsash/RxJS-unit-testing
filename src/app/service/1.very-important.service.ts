import {Injectable} from '@angular/core';
import {asapScheduler, asyncScheduler, combineLatest, merge, Observable, ObservableInput, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {debounceTime, delay, distinctUntilChanged, filter, map, repeatWhen, switchMap, take, tap} from 'rxjs/operators';

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

  getData(timeSec) {
    return this.http.get('some_url')
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

  getSearchResults(input$: Observable<any>, timeout: number) {
    return input$.pipe(
      map(e => e.target.value),
      filter(text => text.length > 2),
      debounceTime(timeout),
      distinctUntilChanged(),
      switchMap((text) => this.http.get('url?search=' + text))
    );
  }
}
