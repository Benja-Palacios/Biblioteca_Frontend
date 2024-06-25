export interface Autor {
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  imagenes?: string;
  imagen: File;
  autorLibroGuid?: string;
}
