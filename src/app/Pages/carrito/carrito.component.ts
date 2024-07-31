import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CarritoPreviewService } from '../../Services/carrito-preview.service';
import { libro } from '../../Models/Libro';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: { libro: libro; cantidad: number }[] = [];
  subtotal: number = 0;
  descuento: number = 0;
  impuestos: number = 0;
  total: number = 0;

  constructor(private carritoService: CarritoPreviewService) {}

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.actualizarDetalles();
  }

  incrementQuantity(libro: libro) {
    const item = this.carrito.find(
      (item) => item.libro.autorLibro === libro.autorLibro
    );
    if (item) {
      item.cantidad++;
      this.carritoService.cambiarCantidad(libro, item.cantidad);
      this.actualizarDetalles();
    }
  }

  decrementQuantity(libro: libro) {
    const item = this.carrito.find(
      (item) => item.libro.autorLibro === libro.autorLibro
    );
    if (item && item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.cambiarCantidad(libro, item.cantidad);
      this.actualizarDetalles();
    }
  }

  eliminarLibro(libro: libro) {
    this.carritoService.eliminarLibro(libro);
    this.carrito = this.carritoService.obtenerCarrito(); // Actualizar la lista después de eliminar
    this.actualizarDetalles();
  }

  vaciarCarrito() {
    this.carritoService.limpiarCarrito();
    this.carrito = []; // Vaciar la lista local
    this.actualizarDetalles();
  }

  actualizarDetalles() {
    const detalles = this.carritoService.calcularDetalles();
    this.subtotal = detalles.subtotal;
    this.descuento = detalles.descuento;
    this.impuestos = detalles.impuestos;
    this.total = detalles.total;
  }

  get cantidadTotal(): number {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }

  get precioUnitario(): number {
    return this.carrito.length > 0 ? this.carrito[0].libro.precio : 0;
  }
}
