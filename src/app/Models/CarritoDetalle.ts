export interface Producto {
    libroId: string;
    tituloLibro: string;
    autorLibro: string;
    fechaPublicacion: Date;
    genero: string;
    precio: number;
  }
  
  export interface CarritoDetalle {
    carritoId: number;
    fechaCreacionSesion: Date;
    listaDeProductos: Producto[];
  }
  