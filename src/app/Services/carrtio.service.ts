import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Carrito } from '../Models/Carrito';
import { Observable } from 'rxjs';
import { CarritoDetalle } from '../Models/CarritoDetalle'
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private http = inject(HttpClient);
  private apiURL: string = appsettings.apiUrlCarrtito + 'CarritoCompras';

  constructor() {}

  crearCarrito(carrito: Carrito) {
    return this.http.post(this.apiURL, carrito);
  }

  obtenerCarritoPorId(id: number): Observable<CarritoDetalle> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<CarritoDetalle>(url);
  }
  
}
