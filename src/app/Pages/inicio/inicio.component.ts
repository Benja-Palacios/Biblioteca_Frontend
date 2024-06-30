import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AutorLibroService } from '../../Services/autor-libro.service';
import { Autor } from '../../Models/Autor';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  private autorService = inject(AutorLibroService);
  public listaAutor: Autor[] = [];
  public displayedColumns: string[] = [
    'nombre',
    'apellido',
    'fechaNacimiento',
    'imagenes',
  ];
  public searchId: string | null = null;

  constructor(private router: Router) {
    this.obtenerAutor();
  }

  obtenerAutor() {
    this.autorService.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaAutor = data;
        }
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  buscarAutor() {
    if (this.searchId && this.searchId.trim() !== '') {
      this.autorService.obtener(this.searchId).subscribe({
        next: (data) => {
          this.listaAutor = [data];
        },
        error: (err) => {
          console.log(err.message);
          this.listaAutor = [];
        },
      });
    } else {
      // Si el campo de búsqueda está vacío, cargar todos los autores
      this.obtenerAutor();
    }
  }
}
