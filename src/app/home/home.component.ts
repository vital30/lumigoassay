import { Component, OnInit } from '@angular/core';
import {DataService} from '../_service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:any[] = [];
  inCartProducts:any[] = [];
  filteredProducts:any[] = [];
  filterTerm!: string;
  ChBList: any = [
    { id: 100, name: 'Under 100' },
    { id: 200, name: 'Over 200' }
  ];
  ChBRating: any = [
    { id: 1, name: '1' },
    { id: 2, name: '3' },
    { id: 3, name: '5' }
  ];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.getData().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = this.products;
        console.log(data)
      },
      (err) => {
        console.log(err)
      }
    );
  }

  onCheckboxChange(event:any){
    if (event.target.name === "100" ) {
      if ( event.target.checked) {
        this.products = this.products.filter(function(val){ return val.price <= 100});
      }else{
        
      }
    }
   

    if ( event.target.checked && event.target.name === "200" ) {
      this.products = this.products.filter(function(val){ return val.price >= 200});
    }
    if ( event.target.checked) {
        this.filteredProducts = this.products.filter(x => 
          (x.price <= 100)
          || (x.price >= 200)
      );
    }

  }

  onCheckboxChangeRating(event:any){
    if ( event.target.checked ) {
      this.products = this.products.filter(function(val){ return val.rating >= event.target.value});
    }
  }

  addToCart(product:any, count:any){
    count = Number(count);
    if(this.inCartProducts.includes(product)){
      if(!product.count){
        product.count = count;
      }else{product.count += count }
      
    }else{
      product.count = count;
      this.inCartProducts.push(product)
    }

    
  }
  
  removeFromCart(product:any){
    this.inCartProducts =  this.inCartProducts.filter(i => i.id !== product.id);
  }
}
