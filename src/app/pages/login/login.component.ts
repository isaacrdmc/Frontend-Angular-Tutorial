import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,     // ? Nos permite usar el componente si necesidad de estar en un módulo
  imports: [
    MatInputModule,
    RouterLink,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})



export class LoginComponent implements OnInit {

  // ? Inyectamos las dependencias necesarias sin necesidad de un constructor
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  // * Definimos las propiedades del componente
  hide = true;    // * Ocultamos la contraseña por defecto
  form!: FormGroup; // * Formulario reactivo para el login
  fb = inject(FormBuilder);


  // ? Creamos el formulario para el login
  login() {

    // ? Validamos el formulario antes de enviar los datos
    this.authService.login(this.form.value).subscribe({
      // * Muestra un snackBar con el mensaje de éxito y nos redirije a la página princiapl
      next: (response) => {
        this.matSnackBar.open(response.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/']);
      },

      // * Si hay errores muestra un snackBar con el mensaje de error
      error: (error) => {
        this.matSnackBar.open(error.error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
        });
      },
    });
  }



  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
