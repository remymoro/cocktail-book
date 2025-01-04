import { Component, computed, effect, inject, signal } from '@angular/core';
import { CocktailsListComponent } from './components/cocktails-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details.component';
import { Cocktail } from 'app/shared/interfaces';
import { CocktailsService } from 'app/shared/services/cocktails.service';

@Component({
  selector: 'app-cocktails',
  imports: [CocktailsListComponent, CocktailDetailsComponent],
  template: `
    <app-cocktails-list
      [(selectedCocktailId)]="selectedCocktailId"
      [cocktails]="cocktails()"
      class="w-half xs-w-full card"
    />

    @let sc = selectCocktail(); @if (sc) {
    <app-cocktail-details [cocktail]="sc" class="w-half xs-w-full card" />
    }
  `,
  styles: `
    :host {
      display: flex;
      gap:24px;
      padding: 24px;
      @media screen and (max-width: 820px) {
        flex-direction: column;
      }
    }
  `,
})
export class CocktailsComponent {
  cocktailService: CocktailsService = inject(CocktailsService);

  cocktails = computed(
    () => this.cocktailService.cocktailsResource.value() || []
  );
  selectedCocktailId = signal<string | null>(null);
  selectCocktail = computed(() =>
    this.cocktails().find(({ _id }) => _id === this.selectedCocktailId())
  );
  selectedCocktailName = computed(() => this.selectCocktail()?.name);
}
