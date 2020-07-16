import {Injectable} from '@angular/core';
import {asapScheduler, asyncScheduler, combineLatest, from, merge, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {debounceTime, delay, distinctUntilChanged, filter, map, observeOn, repeatWhen, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeryImportantServiceVTS {

  searchStringChange$ = new Subject();
  paginationChange$ = new Subject();

  constructor(private http: HttpClient) {
  }

  getRangeASAP(scheduler = asapScheduler) {
    return from([0, 1, 2, 3], scheduler); // emits 0..1..2..3
  }

  getData(timeSec, scheduler = asyncScheduler) {
    return this.http.get('some_url')
      .pipe(
        repeatWhen((n) => n.pipe(
          delay(timeSec * 1000, scheduler),
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

  getSearchResults(input$, scheduler = asyncScheduler) {
    return input$.pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      filter((text: string) => text.length > 2),
      debounceTime(750, scheduler),
      distinctUntilChanged(),
      switchMap((text) => this.http.get('url?search=' + text))
    );
  }
}
