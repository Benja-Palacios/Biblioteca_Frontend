import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../Services/libro.service';
import { CarritoPreviewService } from '../../Services/carrito-preview.service';
import { libro } from '../../Models/Libro';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-book',
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
  templateUrl: './home-book.component.html',
  styleUrls: ['./home-book.component.css']
})
export class HomeBookComponent implements OnInit {
  libros: libro[] = [];
  public searchId: string | null = null;
  carrito: libro[] = [];

  constructor(
    private libroService: LibroService,
    private carritoService: CarritoPreviewService
  ) {}

  ngOnInit() {
    this.obtenerLibros();
  }

  obtenerLibros() {
    this.libroService.lista().subscribe((libros: libro[]) => {
      this.libros = libros;
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
