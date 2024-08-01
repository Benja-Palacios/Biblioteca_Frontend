import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule aquí
import { CommonModule } from '@angular/common'; // Importa CommonModule aquí
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login-roles',
  standalone: true,
  imports: [FormsModule, CommonModule,MatCardModule,MatFormFieldModule,MatInputModule, MatButtonModule, MatIconModule], // Asegúrate de incluir CommonModule aquí
  templateUrl: './login-roles.component.html',
  styleUrls: ['./login-roles.component.css']
})
export class LoginRolesComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      const role = this.authService.getUserRole();
      if (role === 'Administrador') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      this.errorMessage = 'Credenciales inválidas';
    }
  }
}
