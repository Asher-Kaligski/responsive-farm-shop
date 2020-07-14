import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

interface FarmOrder {
  datePlaced: string;
  items: ShoppingCartItem[];
}

@Component({
  selector: 'app-farm-orders',
  templateUrl: './farm-orders.component.html',
  styleUrls: ['./farm-orders.component.scss'],
})
export class FarmOrdersComponent implements OnInit {
  orders: FarmOrder[] = [];
  displayedColumns: string[] = [
    'id',
    'datePlaced',
    'total',
    'name',
    'phone',
    'view',
  ];

  dataSource: MatTableDataSource<FarmOrder>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    // this.orders = await this.orderService.getByFarmOwner(
    //   this.authService.currentUser._id
    // );

    this.orderService
      .getByFarmOwner(this.authService.currentUser._id)
      .then((result: FarmOrder[]) => {
        this.orders = result;

        console.log('this.orders', this.orders);
        let productIds = [];
        let tempIndex = 1;

        this.orders.forEach((order, i, array) => {
          if (i !== 0)
            console.log(
              'date',
              this.isSameDay(
                new Date(order.datePlaced),
                new Date(array[i - 1].datePlaced)
              )
            );

          if (
            i !== 0 &&
            this.isSameDay(
              new Date(order.datePlaced),
              new Date(array[i - 1].datePlaced)
            )
          ) {
            console.log('i', i);
            console.log('order.items', order.items);
            console.log('array[i - 1].items', array[i - 1].items);

            order.items.forEach((item, index) => {
              if (productIds.includes(item.product._id)) {
                const indexOfMatchedItem = array[i - 1].items
                  .map((e) => e._id)
                  .indexOf(item.product._id);
                console.log('indexOfMatchedItem', indexOfMatchedItem);
                if (indexOfMatchedItem !== -1) {
                  array[i - 1].items[indexOfMatchedItem].quantity +=
                    item.quantity;
                  array[i - 1].items[
                    indexOfMatchedItem
                  ].itemTotalPrice += item.itemTotalPrice;
                } else {
                  productIds.push(item.product._id);
                  array[i - 1].items.push(item);
                }
              } else {
                productIds.push(item.product._id);
                array[i - 1].items.push(item);
              }
              // if (order.items.length === index + 1) {
              //   array.splice(i, 1);
              //   tempIndex++;
              //   console.log('tempIndex', tempIndex);
              //   console.log('i', i);
              // }
            });
          } else {
            productIds = order.items.map((item) => item.product._id);
          }
        });

        console.log(productIds);
        console.log('this.orders after adding', this.orders);

        this.dataSource = new MatTableDataSource(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    /*this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'total') {
        return item.shoppingCart.totalPrice;
      } else if (property === 'name') {
        return item.customer.firstName;
      } else if (property === 'phone') {
        return item.customer.phone;
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
    };*/
  }

  isSameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
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
