import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'shared/models/product';
import { AuthService } from 'shared/services/auth.service';
import { ProductService } from 'shared/services/product.service';

@Component({
  selector: 'app-farm-products',
  templateUrl: './farm-products.component.html',
  styleUrls: ['./farm-products.component.scss'],
})
export class FarmProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter(
          (p) =>
            p.title.toLocaleLowerCase().includes(query.toLowerCase()) ||
            p.category
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase()) ||
            p.price.toString().includes(query)
        )
      : this.products;
  }

  async delete(product) {
    try {
      if (!confirm('Are you sure you want to delete this product?')) { return; }

      const res = await this.productService.delete(product._id);
      const index = this.products.indexOf(product);
      if (index !== -1) { this.products.splice(index, 1); }
      this.toastr.success(
        `The product '${res.title}' has been deleted successfully`
      );
    } catch (error) {
      this.toastr.error('Unable to delete the product', error);
    }
  }

  ngOnInit(): void {
    this.productService
      .getByFarmOwner(this.authService.currentUser._id)
      .then((res) => (this.filteredProducts = this.products = res))
      .catch((err) => {
        this.toastr.error('No products found');
        console.error(err);
      });
  }
}
