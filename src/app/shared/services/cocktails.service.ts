import { Injectable, resource } from '@angular/core';
import { Cocktail } from '../interfaces';

const BASE_URL = 'https://restapi.fr/api/acocktails';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  cocktailsResource = resource({
    loader: async (): Promise<Cocktail[]> => (await fetch(BASE_URL)).json(),
  });

  async deleteCocktail(cocktailId: string) {
    await fetch(`${BASE_URL}/${cocktailId}`, {
      method: 'DELETE',
    });
    this.cocktailsResource.reload();
  }
}
