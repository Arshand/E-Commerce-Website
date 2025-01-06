import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  private cartCount = new BehaviorSubject<number>(0); // Add cart count as a BehaviorSubject

  cartItems$ = this.cartItems.asObservable();
  cartCount$ = this.cartCount.asObservable(); // Expose cart count as an observable

  addToCart(item: any) {
    const currentItems = this.cartItems.value;
    const existingItemIndex = currentItems.findIndex(cartItem => cartItem._id === item._id);

    if (existingItemIndex >= 0) {
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex].quantity += 1; // Increment quantity
      this.cartItems.next(updatedItems);
    } else {
      const updatedItems = [...currentItems, { ...item, quantity: 1 }];
      this.cartItems.next(updatedItems);
    }

    // Update the cart count
    this.updateCartCount();
  }

  removeFromCart(item: any) {
    const currentItems = this.cartItems.value;
    const updatedItems = currentItems.filter(cartItem => cartItem._id !== item._id);
    this.cartItems.next(updatedItems);

    // Update the cart count
    this.updateCartCount();
  }

  getCartItems() {
    return this.cartItems.value;
  }

  clearCart() {
    this.cartItems.next([]);
    this.cartCount.next(0); // Reset cart count
  }

  private updateCartCount() {
    const count = this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
    this.cartCount.next(count);
  }
}
