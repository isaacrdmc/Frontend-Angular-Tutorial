import { Component, inject, OnInit } from '@angular/core';
import { M } from "../../../../node_modules/@angular/material/form-field.d-CMA_QQ0R";
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    RouterLink,
    MatSelectModule,
    MatIconModule,
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

  // ^
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      roles: [],
      confirmPassword: ['', [Validators.required]],
    })
  }



}
