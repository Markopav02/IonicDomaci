import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
//import { AuthService } from '../../service/auth.service'; // Pretpostavljam da imate AuthService za autentifikaciju

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    if (this.username && this.email && this.password) {
      try {
        await this.authService.register(this.username, this.email, this.password);
        console.log('User registered successfully');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      console.error('All fields are required');
    }
  }
}