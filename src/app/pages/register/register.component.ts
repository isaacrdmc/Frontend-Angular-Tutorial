import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { M } from "../../../../node_modules/@angular/material/form-field.d-CMA_QQ0R";
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
// import { Router } from 'express';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { Observable } from 'rxjs';
import { Role } from '../../interfaces/role';
import { AsyncPipe, NgIf } from '@angular/common';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
    MatSelectModule,
    MatIconModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

// ^
export class RegisterComponent implements OnInit {

  // *
  fb = inject(FormBuilder);
  registerForm!: FormGroup;
  router = inject(Router);
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;

  // * Inyectamos el servicio de los roles
  roleService = inject(RoleService);
  AuthService = inject(AuthService);
  MatSnackBar = inject(MatSnackBar);
  roles$!: Observable<Role[]>;
  errors!: ValidationErrors;


  parsedErrors: { key: string, messages: string[] }[] = [];


  // ^ Creamos el
register(): void {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;

    const registerPayload = {
      emailAddress: formValue.email,
      password: formValue.password,
      fullName: formValue.fullName,
      roles: formValue.roles
    };

    this.AuthService.register(registerPayload).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.parsedErrors = Object.entries(err.error).map(([key, messages]) => ({
          key,
          messages: Array.isArray(messages) ? messages : [messages] // convierte en array si no lo es
        }));
      }
    });
  }


  // ^
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      roles: [],
      confirmPassword: ['', [Validators.required]],
    },
      {
        validator: this.passwordMatchValidations,
      }
    );

    // ? Obtenemos los roles desde el servicio
    this.roles$ = this.roleService.getRoles();

  }


  // ^
  // ^ Validamos que las contraseñas coincidan
  private passwordMatchValidations(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }



}
