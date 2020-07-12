import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'responsive-farm-shop';
  subscription: Subscription;
  deviceXs: boolean;

  constructor() {}

  ngOnInit() {}
}
