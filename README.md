# Frontend de Bibliote

Este proyecto de Biblioteca esta encargada de consumir las siguientes APIs:

## APIs Consumidas

### Grpc_AutorImagen
Repositorio: [Grpc_AutorImagen](https://github.com/Benja-Palacios/Grpc_AutorImagen) 

Este repositorio contiene la API para poder guardar y consultar la imagen del autor.

Base de Datos creada en Sql Server

### Grpc_Client_Autor-Libro
Repositorio: [Grpc_Client_Autor-Libro](https://github.com/Benja-Palacios/Grpc_Client_Autor-Libro)

Este repositorio es la API para guardar los datos del autor, que incluye las siguientes funcionalidades:

- Crear autor
- Consultar autores
- Buscar por ID
- Base de Datos creada en MySql
  

### Tienda.Microservicio.Libro

Repositorio: [Tienda.Microservicio.Libro](https://github.com/Benja-Palacios/Tienda.Microservicio.Libro)

Este repositorio es la API para guardar los datos del libro, que incluye las siguientes funcionalidades:

- Crear libro
- Consultar libros
- Buscar por ID
- Base de Datos creada en Postgres SQL

Además, esta API relaciona el libro con el Autor.

## ¿Como crear las bases de datos?
#### Usando los siguientes comandos
1. Add-Migration
2. le asignas un nombre a la versión
3. Update-Database


## Frontend 
###
El frontend esta creado en Angular 17
podemos ver el proyecto usando el siguiente comando en el CMD 
### ng serve
