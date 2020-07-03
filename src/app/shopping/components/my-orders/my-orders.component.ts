import { Component, OnInit } from '@angular/core';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
})
export class MyOrdersComponent implements OnInit {
  orders$: Promise<Order[]>;
  constructor(private orderService: OrderService) {}

  async ngOnInit() {
    this.orders$ = this.orderService.getOrders();
  }
}
