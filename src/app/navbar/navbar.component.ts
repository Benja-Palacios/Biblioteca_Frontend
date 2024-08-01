import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';  
import { CommonModule } from '@angular/common';  
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userRole: string | null = null;
  private roleSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.roleSubscription = this.authService.getUserRoleObservable().subscribe(role => {
      this.userRole = role;
    });
  }

  ngOnDestroy() {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
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
  }
}
