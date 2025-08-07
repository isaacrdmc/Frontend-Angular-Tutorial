import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acrout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './acrout.component.html',
  styleUrl: './acrout.component.css'
})
export class AcroutComponent {

  authService = inject(AuthService);
  accountDetail$ = this.authService.getDetail();

}
