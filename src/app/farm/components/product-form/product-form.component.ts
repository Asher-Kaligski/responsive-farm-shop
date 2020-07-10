import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'shared/services/auth.service';
import { FarmService } from 'shared/services/farm.service';
import { ProductService } from 'shared/services/product.service';

interface Farm {
  name: string;
  phone: string;
  categories: [];
  _id: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  farm$: Promise<Farm> = null;
  items: [];

  constructor(
    private productService: ProductService,
    private farmService: FarmService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.farm$ = this.farmService.getByFarmOwner(
      this.authService.currentUser._id
    );

    this.farm$.then((res) => {
      this.items = res.categories;
    });
  }

  async save(form) {
    let result: any;
    if (!form.valid) { return; }

    try {
      const farm = await this.farm$;

      form.value.farmId = farm._id;

      result = await this.productService.create(form.value);
      this.toastr.success(
        result.title,
        'The product has been created successfully'
      );

      this.router.navigate(['/farm/products']);
    } catch (error) {
      this.toastr.error('Unable to create product', error);
    }
  }
}
