import { FarmService } from 'shared/services/farm.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-farm-order-details',
  templateUrl: './farm-order-details.component.html',
  styleUrls: ['./farm-order-details.component.scss'],
})
export class FarmOrderDetailsComponent implements OnInit {
  constructor(private farmService: FarmService) {}

  ngOnInit(): void {
    console.log('this.farmService', this.farmService.getFarmOrder());
  }
}
