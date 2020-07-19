import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { FarmService } from 'shared/services/farm.service';

interface Farm {
  name: string;
  phone: string;
  categories: [];
  _id?: string;
}

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
})
export class FarmComponent implements OnInit {
  farm$: Promise<Farm> = null;
  items = [];
  isLoading = false;

  constructor(
    private categoryService: CategoryService,
    private farmService: FarmService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.farm$ = this.farmService.getByFarmOwner(
      this.authService.currentUser._id
    );

    this.categoryService
      .getAll()
      .then((res) => (this.items = res))
      .catch((err) => this.toastr.error(err.error));
  }

  async submitOnCreate(form) {
    let result: any;
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    try {
      form.value.farmOwnerId = this.authService.currentUser._id;

      result = await this.farmService.create(form.value);

      this.router.navigate(['/farm/products']);
      this.toastr.success('The farm has been created successfully.');
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }

  async submitOnUpdate(form) {
    let result: any;
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    try {
      const farm = await this.farm$;

      form.value.farmOwnerId = this.authService.currentUser._id;

      result = await this.farmService.update(form.value, farm._id);

      this.router.navigate(['/']);
      this.toastr.success('The farm has been updated successfully.');
    } catch (err) {
      this.toastr.error(err.error);
    } finally {
      this.isLoading = false;
    }
  }
}
