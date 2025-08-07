import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoleCreateRequest } from '../../interfaces/role-create-request';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-role-form',
  standalone: true,
  imports: [MatInputModule, FormsModule],
  templateUrl: './role-form.component.html',
  styleUrl: './role-form.component.css'
})
export class RoleFormComponent {
  @Input({ required: true }) role!: RoleCreateRequest;
  @Input() errorMessage!: string;
  @Output() addRole: EventEmitter<RoleCreateRequest> =
    new EventEmitter<RoleCreateRequest>();

  add() {
    this.addRole.emit(this.role);
  }
}
