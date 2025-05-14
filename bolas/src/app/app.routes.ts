import { Routes } from '@angular/router';
import { RegisterUserComponent } from './features/auth/register-user/register-user.component';
import { LoginUserComponent } from './features/auth/login-user/login-user.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { PresentationComponent } from './shared/components/presentation/presentation.component';
import { OutOfSessionGuard } from './core/guards/out-of-session.guard';
import { authSessionGuard } from './core/guards/auth-session.guard';
import { ProfileComponent } from '@features/auth/profile/profile.component';

export const routes: Routes = [
    { path: 'bolas', children: [
        { path: 'presentation', component: PresentationComponent, title: "Bolas", canActivate: [OutOfSessionGuard] },
        { path: 'auth', canActivate: [OutOfSessionGuard], children: [
            { path: 'register', component: RegisterUserComponent, title: "Registrar usuario" },
            { path: 'login', component: LoginUserComponent, title: "Iniciar sesión"}, 
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ]},
        { path: 'dashboard', component: DashboardComponent, title: "Inicio", canActivate: [authSessionGuard], children: [
            { path: 'profile', component: ProfileComponent, title: "Perfil" },
            //Hay que cambiarlo por inicio/home
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: '**', redirectTo: 'profile', pathMatch: 'full' }
        ]},
        { path: '', redirectTo: 'presentation', pathMatch: 'full' },
        { path: '**', redirectTo: 'presentation', pathMatch: 'full' }
    ]},
    { path: '', redirectTo: 'bolas/presentation', pathMatch: 'full' },
    { path: '**', redirectTo: 'bolas/presentation', pathMatch: 'full' }
];
