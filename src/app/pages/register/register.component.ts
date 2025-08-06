import { Component, inject, OnInit } from '@angular/core';
import { M } from "../../../../node_modules/@angular/material/form-field.d-CMA_QQ0R";
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from 'express';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { Observable } from 'rxjs';
import { Role } from '../../interfaces/role';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

// ^
export class RegisterComponent implements OnInit{

  // *
  fb = inject(FormBuilder);
  registerForm!:FormGroup;
  router = inject(Router);
  confirmPasswordHide: boolean = true;
  passwordHide: boolean = true;

  // * Inyectamos el servicio de los roles
  roleService=inject(RoleService);
  roles$!:Observable<Role[]>;



  // ^ Creamos el
  register() {

  }



  // ^
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      roles: [],
      confirmPassword: ['', [Validators.required]],
    })

    // ? Obtenemos los roles desde el servicio
    this.roles$ = this.roleService.getRoles();

  }



}
