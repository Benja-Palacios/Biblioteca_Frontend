export interface Cupon {
    cuponId: number;
    cuponCode: string;
    porcentajeDescuento: number;
    descuentoMinimo: number;
    fechaInicio:Date;
    fechaFinal:Date;
    status?: Boolean
  }
  