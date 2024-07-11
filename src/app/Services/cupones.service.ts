import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPICupon } from '../Models/ResponseAPICupon';
import { Cupon } from '../Models/Cupon';

@Injectable({
  providedIn: 'root',
})
export class CuponService {
  private http = inject(HttpClient);
  private apiURL: string = appsettings.apiUrlCupones + 'Cupones';

  constructor() { }

  lista(): Observable<Cupon[]> {
    return this.http.get<ResponseAPICupon<Cupon[]>>(this.apiURL).pipe(
      map(response => response.result)
    );
  }

  crearCupon(cupon: Cupon): Observable<any> {
    return this.http.post(`${this.apiURL}/CrearCupon`, cupon);
  }

  editarCupon(cupon: Cupon): Observable<any> {
    return this.http.put(`${this.apiURL}`, cupon);
  }

  getCuponById(id: number): Observable<Cupon> {
    return this.http.get<ResponseAPICupon<Cupon>>(`${this.apiURL}/id:int?id=${id}`).pipe(
      map(response => response.result)
    );
  }

  getCuponByCode(couponCode: string): Observable<Cupon> {
    return this.http.get<ResponseAPICupon<Cupon>>(`${this.apiURL}/getbycode/${couponCode}`).pipe(
      map(response => response.result)
    );
  }
}
