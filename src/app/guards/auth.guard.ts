import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


// * Función guardia que impide el acceso a rutas si el usuario no está logueado
export const authGuard: CanActivateFn = (route, state) => {
  const matSnackbar = inject(MatSnackBar);

  if (inject(AuthService).isLoggedIn()) {
    return true;
  }

  // ^ Muestramos mensaje de advertencia si no está autenticado
  matSnackbar.open('No puedes visitar esta parte de la web', 'Ok', {
    duration: 3000,
  });

  // ^ Redirigimos al usuario al inicio
  inject(Router).navigate(['/']);

  return false; // Bloquea el acceso a la ruta
};
