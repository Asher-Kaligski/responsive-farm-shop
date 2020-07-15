import {
  FarmOrder,
  FarmService,
} from './../../../shared/services/farm.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'shared/services/order.service';

import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-farm-orders',
  templateUrl: './farm-orders.component.html',
  styleUrls: ['./farm-orders.component.scss'],
})
export class FarmOrdersComponent implements OnInit {
  orders: FarmOrder[] = [];
  matchedOrder: FarmOrder;
  timeInterval = 'day';
  displayedColumns: string[] = ['id', 'datePlaced', 'total', 'view'];

  dataSource: MatTableDataSource<FarmOrder>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private farmService: FarmService
  ) {}

  async ngOnInit() {
    this.orderService
      .getByFarmOwner(this.authService.currentUser._id)
      .then((result: FarmOrder[]) => {
        if (result.length > 0)
          this.sortOrdersByInterval(result, this.timeInterval);

        console.log('this.orders after adding', this.orders);
      });
  }

  setFarmOrder(order: FarmOrder) {
    this.farmService.setFarmOrder(order);
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
        this.orders.push(order);
      }
    });

    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'datePlaced') {
        return item.datePlaced;
      } else if (property === 'total') {
        return this.calculateTotal(item);
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

    for (const order of this.orders) {
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
