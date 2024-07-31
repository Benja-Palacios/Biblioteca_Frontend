import { Component, Inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibroService } from '../../Services/libro.service';
import { CarritoPreviewService } from '../../Services/carrito-preview.service';
import { libro } from '../../Models/Libro';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-ver-libro',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatBadgeModule,
    MatDividerModule,
    MatButtonModule,
  ],
  templateUrl: './ver-libro.component.html',
  styleUrl: './ver-libro.component.css',
})
export class VerLibroComponent {
  libros: libro[] = [];
  public searchId: string | null = null;
  carrito: libro[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private libroService: LibroService,
    private carritoService: CarritoPreviewService
  ) {}

  ngOnInit() {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this.libroService.lista().subscribe((libros: libro[]) => {
      this.libros = libros.filter(
        (libro) => libro.autorLibro === this.data.autorLibroGuid
      );
    });
  }

  buscarAutor() {
    if (this.searchId && this.searchId.trim() !== '') {
      this.libroService.obtener(this.searchId).subscribe({
        next: (data) => {
          this.libros = [data];
        },
        error: (err) => {
          console.log(err.message);
          this.libros = [];
        },
      });
    } else {
      this.obtenerLibros();
    }
  }

  agregarAlCarrito(libro: libro) {
    this.carritoService.agregarAlCarrito(libro);
    console.log(this.carritoService.obtenerCarrito());
  }
}
