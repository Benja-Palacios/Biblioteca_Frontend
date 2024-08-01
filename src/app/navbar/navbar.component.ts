import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CarritoPreviewService } from '../Services/carrito-preview.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatBadgeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userRole: string | null = null;
  cantidadLibros: number = 0;
  private carritoSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService,
    private carritoService: CarritoPreviewService
  ) {}

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
    this.carritoSubscription = this.carritoService.carrito$.subscribe(carrito => {
      this.cantidadLibros = carrito.reduce((total, item) => total + item.cantidad, 0);
    });
  }

  ngOnDestroy() {
    if (this.carritoSubscription) {
      this.carritoSubscription.unsubscribe();
    }
  }

  nuevoAutor() {
    this.router.navigate(['/autor', 0]);
  }

  verAutor() {
    this.router.navigate(['/']);
  }

  nuevoLibro() {
    this.router.navigate(['/libro', 0]);
  }

  openBackOffices() {
    this.router.navigate(['/backoffices']);
  }

  verCarrito() {
    this.router.navigate(['/detalles/carrito']);
  }

  verLibros() {
    this.router.navigate(['/home-book/all']);
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login-home-rol']);
  }
}
