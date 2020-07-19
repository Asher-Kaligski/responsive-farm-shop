import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders: Order[] = [];
  displayedColumns: string[] = ['id', 'date', 'total', 'view'];
  dataSource: MatTableDataSource<Order>;
  isLoading = true;

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
        if (property === 'date') {
          return item.datePlaced;
        } else if (property === 'total') {
          return item.shoppingCart.totalPrice;
        } else {
          return item[property];
        }
      };
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }
}
