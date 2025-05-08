import { Routes } from '@angular/router';
import { RegisterUserComponent } from './features/auth/register-user/register-user.component';
import { LoginUserComponent } from './features/auth/login-user/login-user.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { PresentationComponent } from './shared/presentation/presentation.component';

export const routes: Routes = [
    { path: '', redirectTo: 'bolas/presentation', pathMatch: 'full' },
    { path: 'bolas', children: [
        { path: 'presentation', component: PresentationComponent, title: "Bolas" },
        { path: 'auth', children: [
            { path: 'register', component: RegisterUserComponent, title: "Registrar usuario" },
            { path: 'login', component: LoginUserComponent, title: "Iniciar sesión"}
        ]},
        { path: 'dashboard', component: DashboardComponent, title: "dashboard" }
    ]}
];
