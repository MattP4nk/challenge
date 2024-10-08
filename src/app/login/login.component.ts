import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommsDto } from '../Dtos/Dtos';
import { CommunicationsService } from '../services/communications.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private CommsService: CommunicationsService,
    private Storage: LocalStorageService,
    private route: Router
    ) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }
  request: CommsDto = {
    area: "users",
    command: "login",
  }
  async onSubmit() {
    this.request.credentials = this.loginForm.value
    await this.CommsService.commsManager(this.request).subscribe((data) =>{
      if (data.token != undefined){
        this.Storage.set("key", data.token)
        this.route.navigate(['dashboard'])
      }
    });
  }
}
