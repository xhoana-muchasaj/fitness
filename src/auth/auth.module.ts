import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

//third-party modules firebase
import { AngularFireModule, FirebaseAppConfig } from "@angular/fire";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

//shared modules
import { SharedModule } from "./shared/shared.module";

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            // { path: 'login', loadChildren: './login/login.module#LoginModule' },
            { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
            // { path: 'register', loadChildren: './register/register.module#RegisterModule' },
            { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) }
        ]

    }
];

export const  firebaseConfig:FirebaseAppConfig = {
    apiKey: "AIzaSyB4C-UXsSdhNzbXjGHMurvqaQLrW-4PgZ0",
    authDomain: "fitness-app-267b8.firebaseapp.com",
    databaseURL: "https://fitness-app-267b8-default-rtdb.firebaseio.com",
    projectId: "fitness-app-267b8",
    storageBucket: "fitness-app-267b8.appspot.com",
    messagingSenderId: "979911286768",
    appId: "1:979911286768:web:5a78f9673deab7e75ac735",
    measurementId: "G-LV8RVGJBWR"
  };


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ]
})

export class AuthModule { }