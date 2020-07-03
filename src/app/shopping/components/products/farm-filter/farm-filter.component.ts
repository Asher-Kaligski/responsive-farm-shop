import { Product } from 'shared/models/product';
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'farm-filter',
  templateUrl: './farm-filter.component.html',
  styleUrls: ['./farm-filter.component.scss'],
})
export class FarmFilterComponent implements OnChanges{
  @Input('products') products: Product[];
  @Input('farmName') farmName: string;
  farmNames: string[] = [];
  constructor() {}

  ngOnChanges() {
    if (this.products)
      this.farmNames = [...new Set(this.products.map((p) => p.farm.name))];
  }
}
