import { Subscription } from 'rxjs';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { ShoppingCartItem } from './../../../shared/models/shopping-cart-item';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart;
  subscription: Subscription;
  mediaSub: Subscription;

  displayedColumns: string[] = ['title', 'quantity', 'price', 'totalPrice'];
  dataSource: MatTableDataSource<ShoppingCartItem>;
  // dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private cartService: ShoppingCartService,
    private toastr: ToastrService,
    public media: MediaObserver
  ) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.mediaSub.unsubscribe();
  }
  async ngOnInit() {
    this.mediaSub = this.media.media$.subscribe((change: MediaChange) => {
      // if (
      //   change.mqAlias !== 'sm' &&
      //   change.mqAlias !== 'xs' &&
      //   !this.displayedColumns.includes('imageUrl')
      // ){
      //   this.displayedColumns.unshift('imageUrl');
      // }

      // if (
      //   (change.mqAlias === 'sm' || change.mqAlias === 'xs') &&
      //   this.displayedColumns.includes('imageUrl')
      // )
      //   this.displayedColumns.shift();
      if (change.mqAlias !== 'sm' && change.mqAlias !== 'xs') {
        if (!this.displayedColumns.includes('imageUrl'))
          this.displayedColumns.unshift('imageUrl');

        if (!this.displayedColumns.includes('price'))
          this.displayedColumns.splice(3, 0, 'price');
      } else {
        if (this.displayedColumns.includes('imageUrl'))
          this.displayedColumns.shift();

        if (this.displayedColumns.includes('price'))
          this.displayedColumns.splice(2, 1);
      }
    });

    this.cart = await this.cartService.getCart();
    this.dataSource = new MatTableDataSource(this.cart.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.subscription = this.cartService
      .getCartChangeEmitter()
      .subscribe((shoppingCart) => {
        this.cart = shoppingCart;
        this.dataSource = new MatTableDataSource(this.cart.items);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'title') {
        return item.product.title;
      } else if (property === 'price') {
        return item.product.price;
      } else if (property === 'totalPrice') {
        return item.itemTotalPrice;
      } else {
        return item[property];
      }
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async clearCart() {
    try {
      await this.cartService.clearCart();

      this.toastr.success(
        'All items have been successfully deleted from the shopping cart'
      );
    } catch (err) {
      let { error } = err;

      if (!error) {
        error = err;
      }

      this.toastr.error(error);
    }
  }
}
