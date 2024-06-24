import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { ResponseAPI } from '../Models/ResponseAPI';
import { libro } from '../Models/Libro';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  private http = inject(HttpClient);
  private apiURL: string = appsettings.apiUrlLibro + 'LibroMaterial';

  constructor() {}

  lista() {
    return this.http.get<libro[]>(this.apiURL);
  }

  obtener(id: string) {
    return this.http.get<libro>(`${this.apiURL}/${id}`);
  }

  crear(libroData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseAPI>(this.apiURL, libroData, {
      headers: headers,
    });
  }
}
