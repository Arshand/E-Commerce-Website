import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  private productSub?: Subscription;
  popupVisible = false; // Add this property
  popupMessage = ''; // Add this property

  constructor(
    private productService: ProductService, 
    private cartService: CartService, 
    private router: Router, 
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.productSub = this.productService.getProductAddedListener().subscribe(product => {
      this.products.push(product);
    });
  }

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.showPopup(`${product.name} added to cart!`);
  }

  buyNow(product: any) {
    const purchaseData = {
      productId: product._id,
      productName: product.name,
      productPrice: product.price,
      quantity: 1
    };

    this.http.post('http://localhost:5000/api/purchases', purchaseData).subscribe(
      (response: any) => {
        console.log('Purchase successful', response);
        this.showPopup(`${product.name} purchased!`);
      },
      (error: any) => {
        console.error('Purchase failed', error);
        this.showPopup('Purchase failed. Please try again.');
      }
    );
  }

  showPopup(message: string) {
    this.popupMessage = message;
    this.popupVisible = true;
    console.log('Popup shown with message:', message); // Debug log
    setTimeout(() => {
      this.popupVisible = false;
      console.log('Popup hidden'); // Debug log
    }, 3000); // Hide the popup after 3 seconds
  }
}
