import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'shared/models/product';
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
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  farm$: Promise<Farm> = null;
  items: [];
  product: Product;
  isLoading = false;

  constructor(
    private productService: ProductService,
    private farmService: FarmService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      if (id)
        this.productService.getProduct(id).then((p) => (this.product = p));

      if (this.authService.currentUser.roles.includes('ADMIN'))
        this.farm$ = this.farmService.getByProductId(id);
      else
        this.farm$ = this.farmService.getByFarmOwner(
          this.authService.currentUser._id
        );

      this.farm$.then((res) => {
        this.items = res.categories;
      });
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }

  async save(form) {
    let result: any;
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    try {
      form.value.farmId = this.product.farm._id;

      result = await this.productService.update(form.value, this.product._id);
      this.toastr.success(
        result.title,
        'The product has been updated successfully'
      );

      if (this.authService.currentUser.roles.includes('ADMIN'))
        this.router.navigate(['/admin/products']);
      else this.router.navigate(['/farm/products']);
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }
}
