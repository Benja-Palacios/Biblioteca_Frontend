import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { AutorComponent } from './Pages/autor/autor.component';
import { LibroComponent } from './Pages/libro/libro.component';
import { LoginComponent } from './backoffices/login/login.component';
import { HomeComponent } from './backoffices/home/home.component';
import { CarritoComponent } from './Pages/carrito/carrito.component';
import { HomeBookComponent } from './Pages/home-book/home-book.component';
import { AdminGuard } from './Guards/admin.guard';
import { ClienteGuard } from './Guards/cliente.guard';
import {LoginRolesComponent } from './login-roles/login-roles.component'

export const routes: Routes = [
    {path:'', component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'autor/:id',component:AutorComponent},
    {path:'libro/:id',component:LibroComponent},
    {path:'backoffices',component:LoginComponent},
    {path:'backoffices-home',component:HomeComponent},
    {path:'detalles/carrito',component:CarritoComponent},
    {path:'home-book/all', component:HomeBookComponent},
    { path: 'login-home-rol', component: LoginRolesComponent },

];
