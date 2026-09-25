import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product/product.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent {
  activeCategoryId: number = 0;
  products: any = [];
  constructor(private activatedRoute: ActivatedRoute, private _ProductService: ProductService) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.activeCategoryId = res.id;
      this.loadProductsByCategoryId();
    });
  }

  loadProductsByCategoryId() {
    this._ProductService.getAllProductsByCategoryId(this.activeCategoryId).subscribe((res: any) => {
      this.products = res.data;
    });
  }

  onAddToCart(productId: number) {
    const cartObj = {
      "CartId": 0,
      "CustomerId": 1,
      "ProductId": productId,
      "Quantity": 1,
      "AddedDate": new Date()
    };
    this._ProductService.addToCart(cartObj).subscribe((res: any) => {
      if (res.result) {
        alert("Product added to cart successfully");
        this._ProductService.cartUpdated$.next(true);
      } else {
        alert(res.message);
      }
    });
  }

}
