import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "ring-of-fire-b4305",
      appId: "1:565129358439:web:4912d2ef0c4429cf27b8c2",
      storageBucket: "ring-of-fire-b4305.firebasestorage.app",
      apiKey: "AIzaSyBsDBLpoBkGhrv1yIgqlYhBAgn6Ddzwoi8",
      authDomain: "ring-of-fire-b4305.firebaseapp.com",
      messagingSenderId: "565129358439"
    })),
    provideFirestore(() => getFirestore())
  ]
};
