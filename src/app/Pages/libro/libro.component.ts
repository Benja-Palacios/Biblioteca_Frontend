import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { LibroService } from '../../Services/libro.service';
import { AutorLibroService } from '../../Services/autor-libro.service';
import { Autor } from '../../Models/Autor';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatFileInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css',
  providers: [AutorLibroService, LibroService],
})
export class LibroComponent implements OnInit {
  listaAutor: Autor[] = [];
  formLibro: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private autorService: AutorLibroService,
    private libroService: LibroService
  ) {
    this.formLibro = this.formBuilder.group({
      titulo: ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
      autorLibro: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.obtenerAutor();
  }
  /**
   * Guardar Libro
   */
  guardar(): void {
    if (this.formLibro.valid) {
      const fechaPublicacion: Date = this.formLibro.value.fechaPublicacion;
      const fechaPublicacionFormateada: string = fechaPublicacion
        .toISOString()
        .substring(0, 10);

      const libroData = {
        titulo: this.formLibro.value.titulo,
        fechaPublicacion: fechaPublicacionFormateada,
        autorLibro: this.formLibro.value.autorLibro,
      };

      this.libroService.crear(libroData).subscribe({
        next: (data) => {
          console.log('Libro creado con éxito', data);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el libro', error);
        },
      });
    } else {
      console.warn('Formulario no válido');
    }
  }
  /**
   * Obtener lista de los autores
   */
  obtenerAutor(): void {
    this.autorService.lista().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.listaAutor = data;
          console.log('Autores obtenidos:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener autores', err);
      },
    });
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
