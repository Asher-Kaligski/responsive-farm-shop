import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { FarmService } from 'shared/services/farm.service';

interface Farm {
  name: String;
  phone: String;
  categories: [];
  _id?: String;
}

@Component({
  selector: 'app-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
})
export class FarmComponent implements OnInit {
  farm$: Promise<Farm> = null;
  items = [];

  constructor(
    private categoryService: CategoryService,
    private farmService: FarmService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.farm$ = this.farmService.getByFarmOwner(
      this.authService.currentUser._id
    );

    this.categoryService
      .getAll()
      .then((res) => (this.items = res))
      .catch((err) => console.error(err.error));
  }

  async submitOnCreate(form) {
    let result: any;
    if (!form.valid) { return; }

    try {
      form.value.farmOwnerId = this.authService.currentUser._id;

      result = await this.farmService.create(form.value);

      this.router.navigate(['/farm/products']);
      console.log(result);
    } catch (error) {
      console.error('Error to create farm', error);
    }
  }

  async submitOnUpdate(form) {
    let result: any;
    if (!form.valid) { return; }

    try {
      const farm = await this.farm$;

      form.value.farmOwnerId = this.authService.currentUser._id;

      result = await this.farmService.update(form.value, farm._id);

      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error to create farm', error);
    }
  }
}
