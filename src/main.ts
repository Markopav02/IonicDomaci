import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBF4Nvm32H14EQVyYs9mh7J8qtw6TSHyGk",
  authDomain: "domaci1-4e378.firebaseapp.com",
  projectId: "domaci1-4e378",
  storageBucket: "domaci1-4e378.firebasestorage.app",
  messagingSenderId: "816215843592",
  appId: "1:816215843592:web:70c55615334419160302bd",
  measurementId: "G-YDGZNVLR7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
  if (environment.production) {
    enableProdMode();
  }
  
  bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ),
    ],
  }).catch(err => console.error(err));
