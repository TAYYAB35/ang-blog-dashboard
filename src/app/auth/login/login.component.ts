import { Component } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  showP: boolean = false;
  showPassword: boolean = false;

  constructor(private authService:AuthService) {}

  passwordShow(){
    this.showP = true;
    this.showPassword = true; 
  }
  
  passwordHide(){
    this.showP = false;
    this.showPassword = false; 
  }

  onSubmit(formvalue){
    this.authService.login(formvalue.email,formvalue.password);
  }

}
