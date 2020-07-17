import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss'],
})
export class AdminOrdersComponent implements OnInit {
  isLoading = true;
  orders: Order[] = [];
  displayedColumns: string[] = [
    'id',
    'datePlaced',
    'total',
    'name',
    'phone',
    'view',
  ];

  dataSource: MatTableDataSource<Order>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    try {
      this.orders = await this.orderService.getOrders();

      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (item, property) => {
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
      };
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
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
