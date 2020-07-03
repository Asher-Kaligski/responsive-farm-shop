import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  order$: Promise<Order>;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getById(id);
  }
}
