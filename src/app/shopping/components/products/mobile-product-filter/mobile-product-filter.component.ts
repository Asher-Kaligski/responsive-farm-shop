import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

export interface Category {
  _id: string;
  name: string;
}

@Component({
  selector: 'mobile-product-filter',
  templateUrl: './mobile-product-filter.component.html',
  styleUrls: ['./mobile-product-filter.component.scss'],
})
export class MobileProductFilterComponent implements OnInit {
  @Input('category') category;
  @Output() changeFilter = new EventEmitter();

  categories$: Promise<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
  }
}
