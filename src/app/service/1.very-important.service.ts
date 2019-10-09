import {Injectable} from '@angular/core';
import {asapScheduler, asyncScheduler, merge, of, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {debounceTime, delay, distinctUntilChanged, filter, map, repeatWhen, switchMap, take} from 'rxjs/operators';

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

  getSearchResults(input$, timeout = 750, scheduler = asyncScheduler) {
    return input$.pipe(
      map((e: Event) => (e.target as HTMLInputElement).value),
      filter((text: string) => text.length > 2),
      debounceTime(timeout, scheduler),
      distinctUntilChanged(),
      switchMap((text) => this.http.get('url?search=' + text))
    );
  }

}
