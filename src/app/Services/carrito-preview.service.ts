import { Injectable, inject } from '@angular/core';
import { libro } from '../Models/Libro';

@Injectable({
  providedIn: 'root',
})
export class CarritoPreviewService {
  private carrito: { libro: libro; cantidad: number }[] = [];

  agregarAlCarrito(libro: libro) {
    const index = this.carrito.findIndex(
      (item) => item.libro.autorLibro === libro.autorLibro
    );
    if (index !== -1) {
      this.carrito[index].cantidad += 1; // Incrementar cantidad si el libro ya está en el carrito
    } else {
      this.carrito.push({ libro, cantidad: 1 }); // Agregar nuevo libro con cantidad 1
    }
  }

  obtenerCarrito(): { libro: libro; cantidad: number }[] {
    return this.carrito;
  }

  eliminarLibro(libro: libro) {
    const index = this.carrito.findIndex(
      (item) => item.libro.autorLibro === libro.autorLibro
    );
    if (index !== -1) {
      this.carrito.splice(index, 1); // Eliminar el libro del carrito
    }
  }

  limpiarCarrito() {
    this.carrito = []; // Vaciar todo el carrito
  }

  cambiarCantidad(libro: libro, cantidad: number) {
    const index = this.carrito.findIndex(
      (item) => item.libro.autorLibro === libro.autorLibro
    );
    if (index !== -1) {
      this.carrito[index].cantidad = cantidad; // Cambiar la cantidad del libro
    }
  }

  calcularDetalles() {
    const subtotal = this.carrito.reduce(
      (total, item) => total + item.libro.precio * item.cantidad,
      0
    );
    const descuento = 0; // Puedes agregar lógica para calcular descuentos aquí
    const impuestos = subtotal * 0.16; // Supongamos un 16% de impuestos
    const total = subtotal - descuento + impuestos;

    return {
      subtotal,
      descuento,
      impuestos,
      total,
    };
  }
}
