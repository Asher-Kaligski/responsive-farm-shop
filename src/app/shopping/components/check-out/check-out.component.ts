import { Component, OnInit } from '@angular/core';
import { StorageKey } from 'shared/models/storage.model';
import { StorageService } from 'shared/services/storage.service';

const { SHOPPING_CART_ID } = StorageKey;

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  shoppingCartId: string;
  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.shoppingCartId = this.storageService.read(SHOPPING_CART_ID);
  }
}
