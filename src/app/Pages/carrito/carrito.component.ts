import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CarritoPreviewService } from '../../Services/carrito-preview.service';
import { CarritoService } from '../../Services/carrtio.service';
import { libro } from '../../Models/Libro';
import { MatButtonModule } from '@angular/material/button';
import { Carrito } from '../../Models/Carrito';
import { CarritoDetalle } from '../../Models/CarritoDetalle';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GrupoLibros } from '../../Models/GrupoLibros';
import { CuponService } from '../../Services/cupones.service';
import { Cupon } from '../../Models/Cupon';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule, FormsModule, MatInputModule, MatCheckboxModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: { libro: libro; cantidad: number }[] = [];
  carritoDesdeBD: CarritoDetalle = { carritoId: 0, fechaCreacionSesion: new Date(), listaDeProductos: [] };
  subtotal: number = 0;
  descuento: number = 0;
  impuestos: number = 0;
  total: number = 0;
  busquedaId: number | null = null;
  mostrarCarritoBD: boolean = false;

  precioUnitarioBD: number = 0;
  cantidadTotalBD: number = 0;
  subtotalBD: number = 0;
  descuentoBD: number = 0;
  impuestosBD: number = 0;
  totalBD: number = 0;
  grupoLibros: GrupoLibros[] = []; // Para almacenar los libros agrupados por ID
  cupones: Cupon[] = [];
  cuponesSeleccionados: Set<string> = new Set();
  librosAgrupadosPorId: { [id: string]: number } = {}; // { libroId: cantidad }


  constructor(
    private carritoService: CarritoPreviewService,
    private carritoApiService: CarritoService,
    private cuponService: CuponService
  ) { }

  ngOnInit() {
    this.carrito = this.carritoService.obtenerCarrito();
    this.actualizarDetalles();
    this.cargarCupones();
  }

  incrementQuantity(libro: libro) {
    const item = this.carrito.find(
      (item) => item.libro.libreriaMaterialId === libro.libreriaMaterialId
    );
    if (item) {
      item.cantidad++;
      this.carritoService.cambiarCantidad(libro, item.cantidad);
      this.actualizarDetalles();
    }
  }

  decrementQuantity(libro: libro) {
    const item = this.carrito.find(
      (item) => item.libro.libreriaMaterialId === libro.libreriaMaterialId
    );
    if (item && item.cantidad > 1) {
      item.cantidad--;
      this.carritoService.cambiarCantidad(libro, item.cantidad);
      this.actualizarDetalles();
    }
  }

  eliminarLibro(libro: libro) {
    this.carritoService.eliminarLibro(libro);
    this.carrito = this.carritoService.obtenerCarrito();
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

  confirmarPrecarrito() {
    const fechaCreacionSesion = new Date(); // Convertir a cadena ISO 8601

    const productoLista = this.carrito.flatMap(item =>
      Array(item.cantidad).fill(item.libro.libreriaMaterialId)
    );

    const payload: Carrito = {
      fechaCreacionSesion,
      productoLista
    };

    this.carritoApiService.crearCarrito(payload).subscribe(
      response => {
        this.vaciarCarrito();
        console.log('Carrito confirmado', response);
      },
      error => {
        console.error('Error al confirmar carrito', error);
      }
    );
  }

  cancelarPrecarrito() {
    this.vaciarCarrito();
  }

  buscarCarritoPorId() {
    if (this.busquedaId) {
      this.carritoApiService.obtenerCarritoPorId(this.busquedaId).subscribe(
        (carritoDesdeBD) => {
          this.carritoDesdeBD = carritoDesdeBD;
          this.agruparLibros(); // Agrupar los libros por ID
          this.calcularDetallesCarritoBD();
          this.mostrarCarritoBD = true;
          this.cargarCupones();
        },
        (error) => {
          console.error('Error al obtener el carrito desde la base de datos', error);
          this.mostrarCarritoBD = false;
        }
      );
    } else {
      this.mostrarCarritoBD = false;
    }
  }

  calcularDetallesCarritoBD() {
    this.precioUnitarioBD = this.grupoLibros.length > 0 ? this.grupoLibros[0].precio : 0;
    this.cantidadTotalBD = this.grupoLibros.reduce((total, libro) => total + libro.cantidad, 0);
    this.subtotalBD = this.grupoLibros.reduce((sum, libro) => sum + libro.precioTotal, 0);
    this.impuestosBD = this.subtotalBD * 0.15; // Ejemplo de cálculo de impuestos
    this.totalBD = this.subtotalBD - this.descuentoBD + this.impuestosBD;
  }


  agruparLibros() {
    const librosMap = new Map<string, GrupoLibros>();

    this.carritoDesdeBD.listaDeProductos.forEach(producto => {
      const libroId = producto.libroId;
      if (librosMap.has(libroId)) {
        const libro = librosMap.get(libroId)!;
        libro.cantidad++;
        libro.precioTotal = libro.precio * libro.cantidad;
      } else {
        librosMap.set(libroId, {
          libroId: producto.libroId,
          tituloLibro: producto.tituloLibro,
          autorLibro: producto.autorLibro,
          fechaPublicacion: producto.fechaPublicacion,
          genero: producto.genero,
          precio: producto.precio,
          cantidad: 1,
          precioTotal: producto.precio
        });
      }
    });

    this.grupoLibros = Array.from(librosMap.values());
  }

  cargarCupones() {
    this.cuponService.lista().subscribe(
      (data: Cupon[]) => {
        this.cupones = data;
        this.filtrarCupones(); // Filtrar cupones después de cargar
      },
      (error) => {
        console.error('Error al cargar los cupones', error);
      }
    );
  }


  toggleSeleccion(codigo: string) {
    if (this.cuponesSeleccionados.has(codigo)) {
      this.cuponesSeleccionados.delete(codigo);
    } else {
      this.cuponesSeleccionados.add(codigo);
    }
  }

  filtrarCupones() {
    // Crear un mapa para contar los libros por género
    const categorias = new Map<string, number>();

    this.grupoLibros.forEach(libro => {
      const categoria = libro.genero;
      if (categorias.has(categoria)) {
        categorias.set(categoria, categorias.get(categoria)! + libro.cantidad);
      } else {
        categorias.set(categoria, libro.cantidad);
      }
    });

    console.log('Categorías de libros:', categorias); // Verifica las categorías de libros

    // Filtrar cupones basados en las categorías
    this.cupones = this.cupones.filter(cupon => {
      const cantidadLibros = categorias.get(cupon.tipoGenero) || 0;
      console.log('Cupon:', cupon, 'Cantidad de libros en la categoría:', cantidadLibros); // Depura aquí
      return cantidadLibros > 3; // Ajusta el filtro según tus necesidades
    });

    console.log('Cupones filtrados:', this.cupones); // Verifica los cupones filtrados
  }

  aplicarCupones() {
    let descuentoTotal = 0;

    this.cuponesSeleccionados.forEach(codigo => {
      const cupon = this.cupones.find(c => c.cuponCode === codigo);
      if (cupon) {
        const descuento = this.subtotalBD * (cupon.porcentajeDescuento / 100);
        descuentoTotal += descuento;
      }
    });

    this.descuentoBD = descuentoTotal;
    this.calcularDetallesCarritoBD();
  }
}
