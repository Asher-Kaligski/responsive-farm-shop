import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageKey } from 'shared/models/storage.model';
import { FarmService } from 'shared/services/farm.service';
import { StorageService } from 'shared/services/storage.service';

import { ShoppingCartItem } from './../../shared/models/shopping-cart-item';
import { FarmOrder } from './../../shared/services/farm.service';

const { FARM_ORDER } = StorageKey;

@Component({
  selector: 'app-farm-order-details',
  templateUrl: './farm-order-details.component.html',
  styleUrls: ['./farm-order-details.component.scss'],
})
export class FarmOrderDetailsComponent implements OnInit {
  order: FarmOrder;
  displayedColumns: string[] = [
    'id',
    'imageUrl',
    'title',
    'category',
    'price',
    'quantity',
    'itemTotalPrice',
  ];

  dataSource: MatTableDataSource<ShoppingCartItem>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private farmService: FarmService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.order = this.storage.read(FARM_ORDER);

    this.dataSource = new MatTableDataSource(this.order.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'title') {
        return item.product.title;
      } else if (property === 'category') {
        return item.product.category;
      } else if (property === 'price') {
        return item.product.price;
      } else {
        return item[property];
      }
    };

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  calculateTotal() {
    return this.order.items.reduce((sum, i) => {
      return sum + i.itemTotalPrice;
    }, 0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
