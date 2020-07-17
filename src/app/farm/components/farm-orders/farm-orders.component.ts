import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageKey } from 'shared/models/storage.model';
import { OrderService } from 'shared/services/order.service';
import { StorageService } from 'shared/services/storage.service';

import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { AuthService } from './../../../shared/services/auth.service';
import {
  FarmOrder,
  FarmService,
} from './../../../shared/services/farm.service';

const { FARM_ORDER } = StorageKey;

@Component({
  selector: 'app-farm-orders',
  templateUrl: './farm-orders.component.html',
  styleUrls: ['./farm-orders.component.scss'],
})
export class FarmOrdersComponent implements OnInit {
  sortedOrders: FarmOrder[] = [];
  orders: FarmOrder[] = [];
  matchedOrder: FarmOrder;
  timeIntervalArr = [
    { interval: 'day', format: 'fullDate' },
    { interval: 'month', format: 'M/yyyy' },
    { interval: 'year', format: 'yyyy' },
  ];
  timeInterval;
  displayedColumns: string[] = ['id', 'datePlaced', 'view', 'total'];

  dataSource: MatTableDataSource<FarmOrder>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private farmService: FarmService,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    this.orderService
      .getByFarmOwner(this.authService.currentUser._id)
      .then((result: FarmOrder[]) => {
        if (result.length > 0) {
          this.timeInterval = this.timeIntervalArr[0];
          this.orders = JSON.parse(JSON.stringify(result));
          this.sortOrdersByInterval(result, this.timeInterval.interval);
        }
      });
  }

  setFarmOrder(order: FarmOrder) {
    order.timeInterval = this.timeInterval;
    this.storage.save(FARM_ORDER, order);
  }

  initDataTable() {
    this.dataSource = new MatTableDataSource(this.sortedOrders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'datePlaced') {
        return item.datePlaced;
      } else if (property === 'total') {
        return this.calculateTotal(item);
      } else {
        return item[property];
      }
    };
  }

  sortOrdersByInterval(orders: FarmOrder[], interval: string) {
    orders.forEach((order: FarmOrder, i) => {
      if (i !== 0 && this.isSamePeriod(new Date(order.datePlaced), interval)) {
        order.items.forEach((item: ShoppingCartItem, index) => {
          if (this.matchedOrder.productIds.includes(item.product._id)) {
            const productIndex = this.matchedOrder.items
              .map((e) => e.product._id)
              .indexOf(item.product._id);

            this.matchedOrder.items[productIndex].quantity += item.quantity;
            this.matchedOrder.items[productIndex].itemTotalPrice +=
              item.itemTotalPrice;
          } else {
            this.matchedOrder.productIds.push(item.product._id);
            this.matchedOrder.items.push(item);
          }
        });
      } else {
        const productIds = order.items.map((item) => item.product._id);
        order.productIds = productIds;
        this.sortedOrders.push(order);
      }
    });

    this.initDataTable();
  }

  isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  isSameMonth(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth()
    );
  }
  isSameYear(d1, d2) {
    return d1.getFullYear() === d2.getFullYear();
  }

  isSamePeriod(orderTime, period) {
    let flag = false;
    this.matchedOrder = null;

    for (const order of this.sortedOrders) {
      switch (period) {
        case 'day':
          flag = this.isSameDay(new Date(order.datePlaced), orderTime);
          break;

        case 'month':
          flag = this.isSameMonth(new Date(order.datePlaced), orderTime);
          break;

        case 'year':
          flag = this.isSameYear(new Date(order.datePlaced), orderTime);
          break;

        default:
          break;
      }
      if (flag) {
        this.matchedOrder = order;
        break;
      }
    }

    return flag;
  }

  calculateTotal(order: FarmOrder) {
    return order.items.reduce((sum, i) => {
      return sum + i.itemTotalPrice;
    }, 0);
  }

  calculateTotalAllOrders() {
    return this.sortedOrders.reduce((sum, order) => {
      return sum + this.calculateTotal(order);
    }, 0);
  }

  selected(event) {
    const copyObj: FarmOrder[] = JSON.parse(JSON.stringify(this.orders));
    this.sortedOrders = [];

    const index = this.timeIntervalArr.findIndex(
      (e) => e.interval === event.value
    );
    if (index !== -1) this.timeInterval = this.timeIntervalArr[index];

    this.sortOrdersByInterval(copyObj, this.timeInterval.interval);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
