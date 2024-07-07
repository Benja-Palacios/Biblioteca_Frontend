import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cuponCode: string = '';
  porcentajeDescuento: string = '';
  descuentoMinimo: string = '';

    displayedColumns: string[] = ['cuponId', 'cuponCode', 'porcentajeDescuento', 'descuentoMinimo', 'acciones'];
    dataSource = [
        { cuponId: 1, cuponCode: 'Cupon 1', porcentajeDescuento: '10%', descuentoMinimo: '5%' },
        { cuponId: 2, cuponCode: 'Cupon 2', porcentajeDescuento: '10%', descuentoMinimo: '5%' },
        { cuponId: 3, cuponCode: 'Cupon 3', porcentajeDescuento: '10%', descuentoMinimo: '5%' },
    ];

    editarCupon(cupon: any) {
        // Implementa aquí la lógica para editar el cupón
        console.log('Editar cupón:', cupon);
        // Por ejemplo, podrías abrir un modal de edición aquí
    }

  
}
