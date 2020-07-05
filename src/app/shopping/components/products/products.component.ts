import { Component, OnChanges, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';

import { CategoryService } from './../../../shared/services/category.service';
import { Category } from './product-filter/product-filter.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnChanges {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[];
  filteredOptions: Observable<Category[]>;

  farmNames: string[] = [];
  cart: ShoppingCart;
  category: string;
  farmName: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    public media: MediaObserver,
    private categoryService: CategoryService
  ) {}

  ngOnChanges() {
    if (this.products)
      this.farmNames = [...new Set(this.products.map((p) => p.farm.name))];
  }

  async ngOnInit() {
    this.cart = await this.cartService.getCart();

    this.products = await this.productService.getAll();

    this.route.queryParamMap.subscribe((params) => {
      this.category = params.get('category');
      this.farmName = params.get('farmName');

      if (this.category)
        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      else
        this.filteredProducts = this.farmName
          ? this.products.filter((p) => p.farm.name === this.farmName)
          : this.products;
    });
  }

  productFilter(query: string) {
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

    this.category = null;
    this.farmName = null;
  }
}
