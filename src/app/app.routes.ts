import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AcroutComponent } from './pages/acrout/acrout.component';
import { authGuard } from './guards/auth.guard';


// ? Definimos las rutas de la aplicación
export const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent},
  { path: 'acrout/:id', component:AcroutComponent, canActivate: [authGuard] },

];
