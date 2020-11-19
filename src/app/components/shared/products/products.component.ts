import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Product } from '../../../_models/product';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  loadingProducts = false;
  product: Product[];

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.loadingProducts = true;
    this.userService.getAllProducts().pipe(first()).subscribe((products: any) => {
      this.loadingProducts = false;
      this.product = products.data;
      this.add20ToArray();
    });
  }


  list: any[] = [];

  get disabled(): boolean {
    return this.list.length >= 300;
  }

  onScrollEnd() {
    this.add20ToArray();
  }

  add20ToArray() {
     this.list.push(this.product);
  }

}
