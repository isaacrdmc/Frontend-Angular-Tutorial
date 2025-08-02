import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

// * Componente princiapl de la aplicación que se encarga de mostrar la página de inicio
export class HomeComponent {
  AuthService = inject(AuthService)
}
