import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { AutorComponent } from './Pages/autor/autor.component';
import { LibroComponent } from './Pages/libro/libro.component';
import { VerLibroComponent } from './Pages/ver-libro/ver-libro.component';


export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'autor/:id',component:AutorComponent},
    {path:'libro/:id',component:LibroComponent},
    {path:'verlibro',component:VerLibroComponent}
];
