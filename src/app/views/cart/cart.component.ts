import { Component, computed, inject } from '@angular/core';
import { CartIngredientsListComponent } from './components/cart-ingredients-list.component';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CartIngredientsListComponent],
  template: `
    <app-cart-ingredients-list class="card" [ingredients]="ingredients()">
    </app-cart-ingredients-list>
  `,
  styles: `:host{ 
    flex: 1 1 auto;
    padding:24px;
  }`,
})
export class CartComponent {
  private cartService: CartService = inject(CartService);
  ingredients = computed(() => this.cartService.ingredients());
}
