import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


// ? Creamos un guarddian de rutas que permite el acceso solo a usuarios con roles específicos
export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data['roles'] as string[]; // Obtiene los roles requeridos desde los datos de la ruta
  const authService = inject(AuthService); // Inyecta el servicio de autenticación
  const matSnackBar = inject(MatSnackBar); // Inyecta el servicio de notificaciones

  
  const router = inject(Router); // Inyectamos el servicio de navegación
  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    matSnackBar.open('Inicia sesión para poder ver esta parte', 'OK', {
      duration: 3000,
    });
    return false;
  }
  const userRoles = authService.getRoles();
  console.log(userRoles);
  console.log(roles);

  if (roles.some((role) => userRoles?.includes(role))) return true;
  router.navigate(['/']);
  matSnackBar.open('No tienes permisos para ver esta web', 'OK', {
    duration: 3000,
  });
  return false;
};
