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
  cuponCode: string = this.generateCouponCode();
  porcentajeDescuento: number | null = null;
  descuentoMinimo: number | null = null;
  editing: boolean = false;
  editingCuponId: number | null = null;
  searchValue: string = '';
  searchType: string = 'id';
  fechaInicio: Date;
  fechaFinal: Date;
  


  displayedColumns: string[] = [
    'cuponId',
    'cuponCode',
    'porcentajeDescuento',
    'descuentoMinimo',
    'fechaInicio',
    'fechaFinal',
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
    const nuevoCupon: Cupon = {
      cuponId: this.editingCuponId ?? 0,
      cuponCode: this.cuponCode,
      porcentajeDescuento: this.porcentajeDescuento ?? 0,
      descuentoMinimo: this.descuentoMinimo ?? 0,
      fechaInicio: this.fechaInicio,
      fechaFinal: this.fechaFinal
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
  }

  resetForm() {
    this.cuponCode = this.generateCouponCode();
    this.porcentajeDescuento = null;
    this.descuentoMinimo = null;
    this.editing = false;
    this.editingCuponId = null;
    this.fechaInicio = new Date;
    this.fechaFinal = new Date;
  }

  generateCouponCode(): string {
    const now = new Date();
    const expirationDate = new Date();
    expirationDate.setDate(now.getDate() + 30);

    // Formatea las fechas
    const formatDate = (date: Date) => {
      const year = String(date.getFullYear()).slice(-2);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}${month}${year}`;
    };

    const creationDate = formatDate(now);
    const expDate = formatDate(expirationDate);

    const randomPart = `BMP${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

    const coupon = `${creationDate}-${expDate}-${randomPart}`;

    return coupon;
  }

  buscarCupon() {
    if (this.searchValue.trim() === '') {
      this.cargarCupones(); // Cargar todos los cupones si el campo de búsqueda está vacío
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
}
