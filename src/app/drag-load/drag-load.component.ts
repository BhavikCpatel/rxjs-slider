import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { of, timer, fromEvent, defer, concat, interval } from 'rxjs';
import {
  map,
  exhaustMap,
  takeUntil,
  tap,
  startWith,
  takeWhile,
  repeat,
  endWith,
} from 'rxjs/operators';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'bp-drag-load',
  templateUrl: './drag-load.component.html',
  styleUrls: ['./drag-load.component.scss'],
})
export class DragLoadComponent implements OnInit {
  @Output()
  refresh = new EventEmitter<void>();
  y = 0;
  // timer$ = timer(0, 100);
  mouseHome$ = defer(() => {
    /* return timer(0, this.y / 200).pipe(
      map((v) => this.y - v),
      takeWhile((v) => v > 0)
    );*/
    return of(0);
  });
  mouseDown$ = fromEvent(document, 'mousedown');
  mouseMove$ = fromEvent(document, 'mousemove');
  mouseUp$ = fromEvent(document, 'mouseup');

  mouseDrag$ = this.mouseDown$.pipe(
    exhaustMap((start: MouseEvent) =>
      concat(
        this.mouseMove$.pipe(
          map((move: MouseEvent) => move.clientY - start.clientY),

          takeUntil(this.mouseUp$),
          tap((v) => (this.y = v))
        ),
        this.mouseHome$
      )
    ),
    tap((pos) => {
      if (pos > window.innerHeight / 4) {
        console.log('sending refresh');
        this.refresh.emit();
      }
    }),
    takeWhile((z) => z <= window.innerHeight / 4)
  );
  moveHomeAfterRefresh$ = this.newsService.loadnews$.pipe(
    exhaustMap(() => this.mouseHome$)
  );
  positionUpdate$ = concat(this.mouseDrag$, this.moveHomeAfterRefresh$).pipe(
    repeat()
  );
  position$ = this.positionUpdate$.pipe(
    startWith(0),
    map((y) => y - 70)
    //map((y) => y)
  );

  //this.transformPosition$.subscribe();
  transformPosition$ = this.position$.pipe(
    map((y) => `translate3d(-35px, ${y}px,0)`)
  );

  rotate$ = this.mouseUp$.pipe(
    startWith(0),
    exhaustMap(() =>
      this.newsService.refresh$.pipe(
        exhaustMap(() =>
          interval(1)
            .pipe(takeWhile((v) => v < 360))
            .pipe(
              repeat(),
              takeUntil(this.newsService.loadnews$),
              endWith(0),
              tap((r) => console.log('rotate val:', r))
            )
        )
      )
    )
  );

  transformRotate$ = this.rotate$.pipe(map((r) => `rotate(${r}deg)`));
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {}
}
