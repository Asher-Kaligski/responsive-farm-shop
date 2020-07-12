import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss'],
})
export class ShippingFormComponent {
  @Input('cartId') cartId: string;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  async submit(form) {
    if (!form.valid) {
      return;
    }

    try {
      const shipping = { ...form.value };
      const order = {
        shipping,
        customerId: this.authService.currentUser._id,
        shoppingCartId: this.cartId,
      };

      await this.orderService.placeOrder(order);

      this.toastr.success('The order has been created successfully');

      this.router.navigate(['/my/orders']);
    } catch (err) {
      let { error } = err;

      if (!error) {
        error = err;
      }

      this.toastr.error(error);
    }
  }
}
