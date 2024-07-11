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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  cuponCode: string = '';
  porcentajeDescuento: number | null = null;
  descuentoMinimo: number | null = null;
  editing: boolean = false;
  editingCuponId: number | null = null;

  displayedColumns: string[] = [
    'cuponId',
    'cuponCode',
    'porcentajeDescuento',
    'descuentoMinimo',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Cupon>();

  constructor(private cuponService: CuponService) { }

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
  }

  resetForm() {
    this.cuponCode = '';
    this.porcentajeDescuento = null;
    this.descuentoMinimo = null;
    this.editing = false;
    this.editingCuponId = null;
  }
}
