import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../service/product/product.service';
import { Observable,map } from 'rxjs';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
products$:Observable<any>
  constructor(private _ProductService: ProductService) {
    this.products$ = this._ProductService.getAllCategories().pipe(
      map((item : any)=>{
        return item.data;
      })
    );
 }
 getAllCategories() {
 }
}
