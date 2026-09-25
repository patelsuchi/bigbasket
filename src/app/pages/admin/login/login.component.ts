import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
loginObj : any ={
  userName : '',
  password : ''
};

constructor(private router: Router) { }

onLogin(){
  if(this.loginObj.userName == 'admin' && this.loginObj.password == 'password')
  {
    console.log('Login successful');
    this.router.navigateByUrl('/products');
  } 
  else 
  {
    alert('Invalid username or password');
  }
}
}
