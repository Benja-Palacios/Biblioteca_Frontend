import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { libro } from '../Models/Libro';

@Injectable({
  providedIn: 'root',
})
export class CarritoPreviewService {
  private carrito: { libro: libro; cantidad: number }[] = [];
  private carritoSubject = new BehaviorSubject<
    { libro: libro; cantidad: number }[]
  >(this.carrito);

  carrito$ = this.carritoSubject.asObservable();

  agregarAlCarrito(libro: libro) {
    const index = this.carrito.findIndex(
      (item) => item.libro.libreriaMaterialId === libro.libreriaMaterialId
    );
    if (index !== -1) {
      this.carrito[index].cantidad += 1; // Incrementar cantidad si el libro ya está en el carrito
    } else {
      this.carrito.push({ libro, cantidad: 1 }); // Agregar nuevo libro con cantidad 1
    }
    this.carritoSubject.next(this.carrito); // Emitir cambios
  }

  obtenerCarrito(): { libro: libro; cantidad: number }[] {
    return this.carrito;
  }

  eliminarLibro(libro: libro) {
    const index = this.carrito.findIndex(
      (item) => item.libro.libreriaMaterialId === libro.libreriaMaterialId
    );
    if (index !== -1) {
      this.carrito.splice(index, 1); // Eliminar el libro del carrito
      this.carritoSubject.next(this.carrito); // Emitir cambios
    }
  }

  limpiarCarrito() {
    this.carrito = []; // Vaciar todo el carrito
    this.carritoSubject.next(this.carrito); // Emitir cambios
  }

  cambiarCantidad(libro: libro, cantidad: number) {
    const index = this.carrito.findIndex(
      (item) => item.libro.libreriaMaterialId === libro.libreriaMaterialId
    );
    if (index !== -1) {
      this.carrito[index].cantidad = cantidad; // Cambiar la cantidad del libro
      this.carritoSubject.next(this.carrito); // Emitir cambios
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
