import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { AutorLibroService } from '../../Services/autor-libro.service';
import { Autor } from '../../Models/Autor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatIconModule, MatButtonModule], // Añade CommonModule aquí
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  private autorService = inject(AutorLibroService);
  public listaAutor: Autor[] = [];
  public displayedColumns: string[] = ["nombre", "apellido", "fechaNacimiento", "imagenes"]

  obtenerAutor() {
    this.autorService.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaAutor = data;
        }
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }

  constructor(private router: Router) {
    this.obtenerAutor();
  }

  nuevo() {
    this.router.navigate(['/autor', 0]);
  }
}
