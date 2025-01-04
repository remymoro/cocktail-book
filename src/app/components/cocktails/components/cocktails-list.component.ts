import { Component, input, output } from '@angular/core';
import { Cocktail } from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktails-list',
  imports: [],
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <ul class="mb-20">
      @for (cocktail of cocktails(); track cocktail.name) { @let active =
      cocktail.name === selectedCocktailName();
      <li
        [class.active-item]="active"
        [class.text-primary]="active"
        (click)="selectCocktail.emit(cocktail.name)"
        class="px-12 py-6 my-2 radius"
      >
        <h3>{{ cocktail.name }}</h3>
      </li>
      }
    </ul>
    <button class="btn btn-primary">Ajouter un cocktail</button>
  `,
  styles: `
    li:hover {
      cursor: pointer;
      background-color: var(--light);
      transition: all 0.4s;
    }
  `,
})
export class CocktailsListComponent {
  cocktails = input<Cocktail[]>();
  selectedCocktailName = input.required();
  selectCocktail = output<string>();
}
