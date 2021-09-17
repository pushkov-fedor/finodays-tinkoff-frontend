import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Host,
  Self,
  Optional,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, fromEvent, of, Subject, merge, combineLatest } from 'rxjs';
import {
  map,
  startWith,
  switchMap,
  tap,
  debounceTime,
  filter,
  scan,
  withLatestFrom,
  mergeMap,
  takeUntil,
  takeWhile,
  distinctUntilChanged,
  skipUntil,
  exhaustMap,
  endWith,
  throttleTime,
  throttle,
} from 'rxjs/operators';
import { takeWhileInclusive } from 'rxjs-take-while-inclusive';

export interface IAutoCompleteScrollEvent {
  autoComplete: MatAutocomplete;
  scrollEvent: Event;
}

@Directive({
  selector: 'mat-autocomplete[optionsScroll]',
})
export class OptionsScrollDirective implements OnDestroy {
  @Input() thresholdPercent = 0.8;
  @Output('optionsScroll') scroll =
    new EventEmitter<IAutoCompleteScrollEvent>();
  _onDestroy = new Subject();

  prevScrollEventTimestamp: number;

  constructor(public autoComplete: MatAutocomplete) {
    this.autoComplete.opened
      .pipe(
        tap(() => {
          // Note: When autocomplete raises opened, panel is not yet created (by Overlay)
          // Note: The panel will be available on next tick
          // Note: The panel wil NOT open if there are no options to display
          setTimeout(() => {
            // Note: remove listner just for safety, in case the close event is skipped.
            this.removeScrollEventListener();
            this.autoComplete.panel.nativeElement.addEventListener(
              'scroll',
              this.onScroll.bind(this)
            );
          });
        }),
        takeUntil(this._onDestroy)
      )
      .subscribe();

    this.autoComplete.closed
      .pipe(
        tap(() => this.removeScrollEventListener()),
        takeUntil(this._onDestroy)
      )
      .subscribe();
  }

  private removeScrollEventListener() {
    this.autoComplete.panel.nativeElement.removeEventListener(
      'scroll',
      this.onScroll
    );
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();

    this.removeScrollEventListener();
  }

  onScroll(event: Event) {
    if (this.thresholdPercent === undefined) {
      console.log('1');
      this.scroll.next({ autoComplete: this.autoComplete, scrollEvent: event });
    } else {
      const threshold =
        (this.thresholdPercent * 100 * (event.target as any).scrollHeight) /
        100;
      const current =
        (event.target as any).scrollTop + (event.target as any).clientHeight;

      //console.log(`scroll ${current}, threshold: ${threshold}`)
      if (current > threshold) {
        //console.log('load next page');
        if (!this.prevScrollEventTimestamp) {
          this.prevScrollEventTimestamp = event.timeStamp;
          this.scroll.next({
            autoComplete: this.autoComplete,
            scrollEvent: event,
          });
        } else if (event.timeStamp - this.prevScrollEventTimestamp > 3 * 1000) {
          this.prevScrollEventTimestamp = event.timeStamp;
          this.scroll.next({
            autoComplete: this.autoComplete,
            scrollEvent: event,
          });
        }
      }
    }
  }
}
