import { Component, Input, OnChanges } from '@angular/core';
import { Product } from 'shared/models/product';

@Component({
  selector: 'mobile-farm-filter',
  templateUrl: './mobile-farm-filter.component.html',
  styleUrls: ['./mobile-farm-filter.component.scss'],
})
export class MobileFarmFilterComponent implements OnChanges {
  @Input('products') products: Product[];
  @Input('farmName') farmName: string;
  farmNames: string[] = [];
  constructor() {}

  ngOnChanges() {
    if (this.products)
      this.farmNames = [...new Set(this.products.map((p) => p.farm.name))];
  }
}
