import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { AutorComponent } from './Pages/autor/autor.component';

export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'autor/:id',component:AutorComponent}
];
