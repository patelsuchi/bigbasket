import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../service/product/product.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
isSidePanelVisible: boolean = false;
productObj : any = {
  "productId": 0,
  "productSku": "",
  "productName": "",
  "productPrice": 0,
  "productShortName": "",
  "productDescription": "",
  "createdDate": new Date(),
  "deliveryTimeSpan": "",
  "categoryId": 0,
  "productImageUrl": "",
  "userId": 0
}
categoryList : any = [];
productList : any = [];

constructor( private _ProductService: ProductService) { }

ngOnInit(): void {
this.getAllCategories();
this.getProducts();
}

getProducts(){
  this._ProductService.getAllProducts().subscribe(
    (res: any) => {
      this.productList = res.data;
    }
  )
}

getAllCategories() {
  debugger;
  this._ProductService.getAllCategories().subscribe(
    (res: any) => {
      this.categoryList = res.data;
    }
  )
}
onSave(){
  this._ProductService.createProduct(this.productObj).subscribe(
    (res: any) => {
      if(res.result){
        alert('Product created successfully');
        this.getProducts();
        this.closeSidePanel();
      }
      else{
        alert('Product creation failed');
      }
    }
  )
}
onUpdate(){
  this._ProductService.updateProduct(this.productObj).subscribe(
    (res: any) => {
      if(res.result){
        alert('Product updated successfully');
        this.getProducts();
        this.closeSidePanel();
      }
      else{
        alert('Product creation failed');
      }
    }
  )
}
onDelete(item: any){
  const isDelete = confirm('Are you sure you want to delete this product?');
  if(isDelete){
    this._ProductService.deleteProduct(item.productId).subscribe(
      (res: any) => {
        if(res.result){
          alert('Product deleted successfully');
          this.getProducts();
        }
        else{
          alert(res.message);
        }
      }
    )
  }
}
resetProductObj() {
  this.productObj = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createdDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl": "",
    "userId": 0
  };
}

onEdit(item: any){
  this.productObj = Object.assign({}, item);
  this.isSidePanelVisible = true;
}
openSidePanel() {
  this.resetProductObj();
  this.isSidePanelVisible = true;
}

closeSidePanel() {
  this.isSidePanelVisible = false;
}
}
