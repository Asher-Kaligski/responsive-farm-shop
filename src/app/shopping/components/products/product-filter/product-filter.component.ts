import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

export interface Category {
  _id: string;
  name: string;
}

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  @Output() changeFilter = new EventEmitter();

  categories$: Promise<Category[]>;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll();
  }

  filter(query) {
    this.changeFilter.emit(query);
  }
}
