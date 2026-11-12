import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header style="background: #111; color: #fff; padding: 15px 20px;">
      <h1 style="margin: 0; font-size: 24px;">PulseFit Management System</h1>
    </header>
    <main style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}