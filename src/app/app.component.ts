import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Navigate to a specific page on app start
      this.router.navigateByUrl('/login');
    });
  }
}