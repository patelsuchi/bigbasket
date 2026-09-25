import { Component } from '@angular/core';
import { ProductService } from '../../../service/product/product.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {

  productList: any[] = [];
  categoryList: any[] = [];
  cartList: any[] = [];

  constructor(private _productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.getCartByCustomerId();
    this._productService.cartUpdated$.subscribe((res: boolean) => {
      this.getCartByCustomerId();
    });
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe((res: any) => {
      this.productList = res.data;
    });
  }

  getAllCategories() {
    this._productService.getAllCategories().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }

  onCategoryClick(id: number) {
    this.router.navigate(['/products', id]);
  }

  getCartByCustomerId() {
    this._productService.getCartDataByCustomerId(1).subscribe((res: any) => {
      this.cartList = res.data;
    });
  }
  remove(id: number) {
    this._productService.deleteCartItemById(id).subscribe((res: any) => {
      if (res.result) {
        alert('Product removed from cart successfully');
        this.getCartByCustomerId();
      } else {
        alert(res.message);
      }
    });
  }
}
