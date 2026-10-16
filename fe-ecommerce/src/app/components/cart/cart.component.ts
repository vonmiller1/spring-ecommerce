import { Component } from '@angular/core';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  template: `
    <div class="cart-area d-n">
      <a href="shopping-detail.html">
        <div class="total">$ {{totalAmount}}<span>{{numberOfItems}}</span></div> 
        <i class="bi bi-cart" aria-hidden="true"></i>
      </a>
    </div>
  `,
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  numberOfItems = 0;
  totalAmount = 0;
}
