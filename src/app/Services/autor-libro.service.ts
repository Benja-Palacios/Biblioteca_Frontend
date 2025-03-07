import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Autor } from '../Models/Autor';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root',
})
export class AutorLibroService {
  private http = inject(HttpClient);
  private apiURL: string = appsettings.apiUrl + 'Autor';

  constructor() {}

  lista() {
    return this.http.get<Autor[]>(this.apiURL);
  }

  obtener(id: string) {
    return this.http.get<Autor>(`${this.apiURL}/${id}`);  // Cambiado a Autor
  }

  crear(formData: FormData) {
    return this.http.post<ResponseAPI>(this.apiURL, formData);
  }
}
