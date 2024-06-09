import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Router } from '@angular/router';
import { AutorLibroService } from '../../Services/autor-libro.service';
import { Autor } from '../../Models/Autor';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@Component({
  selector: 'app-autor',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatFileInputModule,
  ],
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css'],
})
export class AutorComponent {
  private autorLibroService = inject(AutorLibroService);
  public formBuild = inject(FormBuilder);

  public formAutorLibro: FormGroup = this.formBuild.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fechaNacimiento: ['', Validators.required],
    imagen: [],
  });

  constructor(private router: Router) {}

  guardar() {
    if (this.formAutorLibro.valid) {
      const fechaNacimiento: Date = this.formAutorLibro.value.fechaNacimiento;
      const fechaNacimientoFormateada: string = fechaNacimiento
        .toISOString()
        .substring(0, 10);

      const formData = new FormData();
      formData.append('nombre', this.formAutorLibro.value.nombre);
      formData.append('apellido', this.formAutorLibro.value.apellido);
      formData.append('fechaNacimiento', fechaNacimientoFormateada);
      formData.append(
        'imagen',
        this.formAutorLibro.value.imagen,
        this.formAutorLibro.value.imagen.name
      );

      this.autorLibroService.crear(formData).subscribe({
        next: (data) => {
          console.log('Autor creado con éxito', data);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error al crear el autor', error);
        },
      });
    } else {
      console.warn('Formulario no válido');
    }
  }
}
