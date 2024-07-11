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
  porcentajeDescuento: number = 0;
  descuentoMinimo: number = 0;

  displayedColumns: string[] = [
    'cuponId',
    'cuponCode',
    'porcentajeDescuento',
    'descuentoMinimo',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Cupon>();

  constructor(private cuponService: CuponService) {}

  ngOnInit() {
    this.cuponService.lista().subscribe((data: Cupon[]) => {
      this.dataSource.data = data;
    });
  }

  crearCupon() {
    const nuevoCupon: Cupon = {
      cuponId: 0,
      cuponCode: this.cuponCode,
      porcentajeDescuento: this.porcentajeDescuento,
      descuentoMinimo: this.descuentoMinimo
    };
    this.cuponService.crearCupon(nuevoCupon).subscribe((response) => {
      // Manejar la respuesta aquí, como actualizar la tabla de cupones
      this.cuponService.lista().subscribe((data: Cupon[]) => {
        this.dataSource.data = data;
      });
    });
  }

  editarCupon(element: Cupon) {
    // Lógica para editar cupon
  }
}
