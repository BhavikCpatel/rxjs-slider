import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer, Observable } from 'rxjs';
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
  refreshTimer$ = timer(0, 20000);
  title = 'rxjs-slider';
  news$: Observable<News[]> = this.newsService.news$;

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.refreshTimer$
      .pipe(
        takeWhile((x) => x < 3),
        tap((_) => console.log(new Date()))
      )
      .subscribe(this.newsService.refresh$);
  }

  ngOnDestroy() {
    this.allowLoad = false;
  }
}
