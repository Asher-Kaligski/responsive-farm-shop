import { ToastrService } from 'ngx-toastr';
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
  order: Order = null;
  isLoading = true;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    try {
      this.order = await this.orderService.getById(id);
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }
}
