import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable, fromEvent } from 'rxjs';
import { NewsService } from './services/news.service';
import { News } from './models/news';
import { tap, takeUntil, takeWhile } from 'rxjs/operators';
@Component({
  selector: 'bp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  // 10 seconds refresh time
  allowLoad = true;
  refreshTimer$ = timer(0, 6000000);
  title = 'rxjs-slider';
  news$: Observable<News[]> = this.newsService.news$;
  //mouseMove$ = fromEvent(document, 'mousemove');
  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.refreshTimer$
      .pipe(
        takeWhile((x) => x < 3),
        tap((_) => console.log(new Date()))
      )
      .subscribe(this.newsService.refresh$);
    //this.mouseMove$.subscribe((move: MouseEvent) => console.log(move.clientY));
  }
  refreshNews() {
    console.log('calling event');
    this.newsService.refresh$.next(0);
  }
  ngOnDestroy() {
    this.allowLoad = false;
  }
}
