import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CuponService } from '../../Services/cupones.service';
import { Cupon } from '../../Models/Cupon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  genres: string[] = ['Terror', 'Suspenso', 'Fantasía', 'Romance', 'Ciencia Ficción'];
  cuponCode: string = '';
  porcentajeDescuento: number | null = null;
  descuentoMinimo: number | null = null;
  editing: boolean = false;
  editingCuponId: number | null = null;
  searchValue: string = '';
  searchType: string = 'id';
  fechaInicio: Date;
  fechaFinal: Date;
  tipoGenero: string = '';

  displayedColumns: string[] = [
    'cuponId',
    'cuponCode',
    'porcentajeDescuento',
    'descuentoMinimo',
    'fechaInicio',
    'fechaFinal',
    'tipoGenero',
    'acciones',
    'status'
  ];

  dataSource = new MatTableDataSource<Cupon>();

  constructor(private cuponService: CuponService) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.fechaInicio = today;
    this.fechaFinal = today;
  }

  ngOnInit() {
    this.cargarCupones();
  }

  cargarCupones() {
    this.cuponService.lista().subscribe((data: Cupon[]) => {
      this.dataSource.data = data;
    });
  }

  crearCupon() {
    // Generar el código del cupón basado en el tipo de género antes de crear el cupón
    if (!this.cuponCode && this.tipoGenero) {
      this.cuponCode = this.generateCouponCode();
    }

    const nuevoCupon: Cupon = {
      cuponId: this.editingCuponId ?? 0,
      cuponCode: this.cuponCode,
      porcentajeDescuento: this.porcentajeDescuento ?? 0,
      descuentoMinimo: this.descuentoMinimo ?? 0,
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFinal,
      tipoGenero: this.tipoGenero
    };

    if (this.editing) {
      this.cuponService.editarCupon(nuevoCupon).subscribe(() => {
        this.cargarCupones();
        this.resetForm();
      });
    } else {
      this.cuponService.crearCupon(nuevoCupon).subscribe(() => {
        this.cargarCupones();
        this.resetForm();
      });
    }
  }

  editarCupon(cupon: Cupon) {
    this.editing = true;
    this.editingCuponId = cupon.cuponId;
    this.cuponCode = cupon.cuponCode;
    this.porcentajeDescuento = cupon.porcentajeDescuento;
    this.descuentoMinimo = cupon.descuentoMinimo;
    this.fechaInicio = cupon.fechaInicio;
    this.fechaFinal = cupon.fechaFinal;
    this.tipoGenero = cupon.tipoGenero;
  }

  resetForm() {
    this.cuponCode = '';
    this.porcentajeDescuento = null;
    this.descuentoMinimo = null;
    this.editing = false;
    this.editingCuponId = null;
    this.fechaInicio = new Date();
    this.fechaFinal = new Date();
    this.tipoGenero = '';
  }

  buscarCupon() {
    if (this.searchValue.trim() === '') {
      this.cargarCupones();
      return;
    }

    if (this.searchType === 'id') {
      const id = parseInt(this.searchValue, 10);
      if (!isNaN(id)) {
        this.cuponService.getCuponById(id).subscribe(cupon => {
          if (cupon) {
            this.dataSource.data = [cupon];
          } else {
            this.dataSource.data = [];
          }
        });
      }
    } else if (this.searchType === 'cuponCode') {
      this.cuponService.getCuponByCode(this.searchValue).subscribe(cupon => {
        if (cupon) {
          this.dataSource.data = [cupon];
        } else {
          this.dataSource.data = [];
        }
      });
    }
  }

  dateInicioFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d ? d >= today : false;
  };

  dateFinalFilter = (d: Date | null): boolean => {
    const fechaInicioDate = new Date(this.fechaInicio);
    fechaInicioDate.setHours(0, 0, 0, 0);
    return d ? d >= fechaInicioDate : false;
  };

  generateCouponCode(): string {
    if (this.tipoGenero && this.tipoGenero !== '') {
      const randomNum = Math.floor(Math.random() * 90 + 10);
      return `${this.tipoGenero}-BMP-${randomNum}`;
    }
    return '';
  }

  onGenreChange(event: any) {
    this.tipoGenero = event.value;
    console.log('Género Seleccionado:', this.tipoGenero);
    this.cuponCode = this.generateCouponCode();
  }

}
