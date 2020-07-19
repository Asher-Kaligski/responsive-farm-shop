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
  isLoading = false;

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
    this.isLoading = true;
    try {
      const shipping = { ...form.value };
      const order = {
        shipping,
        customerId: this.authService.currentUser._id,
        shoppingCartId: this.cartId,
      };

      await this.orderService.placeOrder(order);

      this.toastr.success('The order has been created successfully');

      if (this.authService.currentUser.roles.includes('ADMIN'))
        this.router.navigate(['/admin/orders']);
      else this.router.navigate(['/my/orders']);
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }
}
