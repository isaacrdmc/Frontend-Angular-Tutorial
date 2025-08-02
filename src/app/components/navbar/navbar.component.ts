import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    RouterLink,
    // MatSnackBarModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


// ?
export class NavbarComponent {

  // ? Inyectamos los servicios necesarios para el compomente de la navBar
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  // *Comprobamos si el usuario esta logueado
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }


  // ? Metodo para cerrar la sesión
  logout = () => {
    this.authService.logout();
    this.matSnackBar.open('Sesión cerrada', 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
    });
    this.router.navigate(['/login']);
  }


}
