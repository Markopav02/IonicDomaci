import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import {
  collection,
  Firestore,
  collectionData,
  doc,
  deleteDoc, 
  addDoc,
  query,
  updateDoc,
  getDocs,
  onSnapshot,
  getDoc,
  runTransaction
 } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

IonRouterOutlet
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  //users: any[] = [];
  users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
    { username: 'admin', password: 'admin123' }
  ];



  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private routerOutlet: IonRouterOutlet,
    private firestore: Firestore) { }

  ngOnInit() {
    this.routerOutlet.swipeGesture = false;
  }
  ngOnDestroy() {
    
  }
  async onLogin(){
    const user = this.users.find(
      (u) => u.username === this.username && u.password === this.password
    );
    if (user) {
      console.log('Login successful:', user.username);
      this.navCtrl.navigateForward('/home');
      // Add navigation or actions upon successful login here
    } else {
      // Show an alert for invalid credentials
      const alert = await this.alertController.create({
        header: 'Login Failed',
        message: 'Invalid username or password. Please try again.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
