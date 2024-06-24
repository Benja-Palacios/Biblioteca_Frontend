import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  ],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css',
})
export class LibroComponent {
  private libroService = inject(LibroService);
  public formBuild = inject(FormBuilder);

  public formLibro: FormGroup = this.formBuild.group({
    titulo: ['', Validators.required],
    fechaPublicacion: ['', Validators.required],
    autorLibro: ['', Validators.required],
  });

  constructor(private router: Router) {}

  guardar() {
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

  volver() {
    this.router.navigate(['/']);
  }
}
