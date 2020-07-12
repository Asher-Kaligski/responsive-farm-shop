import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'price',
    'imageUrl',
    'actions',
  ];

  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  async ngOnInit() {
    this.products = await this.productService.getByFarmOwner(
      this.authService.currentUser._id
    );

    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async delete(product) {
    try {
      if (!confirm('Are you sure you want to delete this product?')) {
        return;
      }

      const res = await this.productService.delete(product._id);
      const index = this.products.indexOf(product);
      if (index !== -1) {
        this.products.splice(index, 1);
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.toastr.success(
        `The product '${res.title}' has been deleted successfully`
      );
    } catch (error) {
      this.toastr.error('Unable to delete the product', error);
    }
  }
}
