import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news';
import { tap, catchError, exhaustMap, share } from 'rxjs/operators';
import { EMPTY, BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}
  refresh$ = new BehaviorSubject(null);
  loadnews$ = this.http.get<News[]>('http://localhost:5201/news').pipe(
    tap((data) => console.log('Load News:Getting Data', data)),
    catchError((err) => {
      console.error('Loading News', err);
      return EMPTY;
    }),
    share()
  );

  news$ = this.refresh$.pipe(
    tap((_) => console.log('Got Request')),
    exhaustMap((_) => this.loadnews$)
  );
}
