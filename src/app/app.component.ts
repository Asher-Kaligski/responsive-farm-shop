import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'responsive-farm-shop';
  subscription: Subscription;
  deviceXs: boolean;

  constructor(
    public mediaObserver: MediaObserver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    this.subscription = this.mediaObserver.media$.subscribe(
      (change: MediaChange) => {
        console.log(change.mqAlias);
        // console.log(change.mediaQuery);
        this.deviceXs = change.mqAlias === 'xs' ? true : false;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
