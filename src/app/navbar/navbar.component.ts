import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatToolbarModule,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) { }
  nuevoAutor() {
    this.router.navigate(['/autor', 0]);
  }
  verAutor() {
    this.router.navigate(['/']);
  }
  nuevoLibro() {
    this.router.navigate(['/libro', 0]);
  }
  verLibro() {
    this.router.navigate(['/verlibro']);
  }
}
