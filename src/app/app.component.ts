import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FooterComponent } from './components/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { seedData } from './shared/data/seed-data';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FooterComponent, RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <!---<app-cocktails class="flex-auto" />!-->
    <div class="flex-auto flex flex-col">
      <router-outlet></router-outlet>
    </div>
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
