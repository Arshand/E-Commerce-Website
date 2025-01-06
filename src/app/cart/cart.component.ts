import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  addedProduct: any = null;
  popupVisible = false;

  constructor(private cartService: CartService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems(); // Update the cart items
  }

  buyNow(item: any) {
    const purchaseData = {
      productId: item._id,
      productName: item.name,
      productPrice: item.price,
      quantity: item.quantity // Include quantity
    };

    this.http.post('http://localhost:5000/api/purchases', purchaseData).subscribe(
      (response: any) => {
        console.log('Purchase successful', response);
        this.removeFromCart(item);
        this.showPopup(`${item.name} purchased!`);
      },
      (error: any) => {
        console.error('Purchase failed', error);
      }
    );
  }

  showPopup(message: string) {
    this.addedProduct = { name: message };
    this.popupVisible = true;
    setTimeout(() => {
      this.popupVisible = false;
    }, 3000); // Hide the popup after 3 seconds
  }
}
