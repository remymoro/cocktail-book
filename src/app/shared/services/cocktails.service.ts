import { Injectable, resource } from '@angular/core';
import { Cocktail } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  private base_URL = 'https://restapi.fr/api/acocktails';

  cocktailsResource = resource({
    loader: async (): Promise<Cocktail[]> =>
      (await fetch(this.base_URL)).json(),
  });

  constructor() {}
}
