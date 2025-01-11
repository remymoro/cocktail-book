import { Component, computed, effect, input } from '@angular/core';

@Component({
  selector: 'app-cart-ingredients-list',
  imports: [],
  template: `
    <h2>Liste des ingrédients</h2>
    <ul>
      @for (ingredient of ingredientDisplays(); track $index) {
      <li class="my-2">
        {{ ingredient[0] }} : <strong>{{ ingredient[1] }}</strong>
      </li>
      }@empty {
      <h1>Aucun ingrédient n'as été trouvé pour le moment</h1>
      }
    </ul>
  `,
  styles: `:host{
    display:block
  }`,
})
export class CartIngredientsListComponent {
  ingredients = input<string[]>([]);
  ingredientDisplays = computed(() =>
    Object.entries(
      this.ingredients().reduce((acc, i) => {
        if (acc[i]) {
          acc[i]++;
        } else {
          acc[i] = 1;
        }

        return acc;
      }, {} as { [s: string]: number })
    )
  );
}
