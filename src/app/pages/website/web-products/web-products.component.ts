import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../service/product/product.service';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-web-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-products.component.html',
  styleUrl: './web-products.component.scss',
})
export class WebProductsComponent implements OnInit {
  productList: any[] = [];
  categoryList: any[] = [];

  constructor(
    private _productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.route.queryParams.subscribe((params: any) => {
      if (!params['category']) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { category: 'Allcategory' },
          queryParamsHandling: 'merge',
        });
      }
    });
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe((res: any) => {
      this.productList = res.data;
    });
  }

  addToCart(product: any) {
    const cartItem = {
      CartId: 0,
      CustId: 1,
      ProductId: product.productId,
      Quantity: 0,
      AddedDate: new Date(),
    };
    this._productService.addToCart(cartItem).subscribe((res: any) => {
      if (res.result) {
        alert('Product added to cart successfully');
        this._productService.cartUpdated$.next(true); 
      }
    });
  }
}
