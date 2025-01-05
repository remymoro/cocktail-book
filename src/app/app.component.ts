import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from './components/footer.component';
import { CocktailsComponent } from './components/cocktails/cocktails.component';
import { HeaderComponent } from './components/header.component';
import { seedData } from './shared/data/seed-data';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, CocktailsComponent, HeaderComponent],
  template: `
    <app-header />
    <app-cocktails class="flex-auto" />
    <app-footer />
  `,
  styles: `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `,
})
export class AppComponent implements OnInit {
  private readonly apiUrl = 'https://restapi.fr/api/acocktails';
  private http: HttpClient = inject(HttpClient);

  ngOnInit(): void {
    this.checkAndSeedData();
  }

  private checkAndSeedData(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        if (Array.isArray(data) && data.length === 0) {
          seedData();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
