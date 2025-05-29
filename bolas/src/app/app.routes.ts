import { Routes } from '@angular/router';
import { RegisterUserComponent } from './features/auth/register-user/register-user.component';
import { LoginUserComponent } from './features/auth/login-user/login-user.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { PresentationComponent } from './shared/components/presentation/presentation.component';
import { OutOfSessionGuard } from './core/guards/out-of-session.guard';
import { authSessionGuard } from './core/guards/auth-session.guard';
import { ProfileComponent } from '@features/auth/profile/profile.component';
import { EventCreationFormComponent } from '@features/event-creation/event-creation-form/event-creation-form.component';
import { EventCreationHistoryComponent } from '@features/event-creation/event-creation-history/event-creation-history.component';
import { HomeComponent } from '@features/events/home/home.component';
import { GroupsComponent } from '@features/social/groups/groups.component';
import { SearchUserProfileComponent } from '@features/social/search-player-profile/search-user-profile.component';
import { UserCardComponent } from './shared/components/user-card/user-card.component';
import { GroupChatComponent } from './shared/components/group-chat/group-chat.component';
import { FollowersListComponent } from './shared/components/followers-list/followers-list.component';
import { FollowsListComponent } from './shared/components/follows-list/follows-list.component';
import { EventsIJoinComponent } from './shared/components/events-ijoin/events-ijoin.component';

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
            { path: 'home', component: HomeComponent, title: 'Home' },
            { path: 'events-i-join', component: EventsIJoinComponent, title: "Eventos inscritos" },
            { path: 'social', children: [
                { path: 'groups', component: GroupsComponent, title: 'Mis grupos' },
                { path: 'search', component: SearchUserProfileComponent, title: 'Buscar usuario'},
                { path: '', redirectTo: 'groups', pathMatch: 'full' },
                { path: '**', redirectTo: 'groups', pathMatch: 'full' }
            ]},
            { path: 'profile', component: ProfileComponent, title: "Perfil" },
            { path: 'event-creation', children: [
                { path: 'event-creation-form', component: EventCreationFormComponent, title: 'Crear un evento' },
                { path: 'event-cration-history', component: EventCreationHistoryComponent, title: 'Historial de eventos creados' },
                { path: '', redirectTo: 'event-creation-form', pathMatch: 'full' },
                { path: '**', redirectTo: 'event-creation-form', pathMatch: 'full' }
            ]},
            { path: 'user/:id', component: UserCardComponent, title: 'Ver usuario' },
            { path: 'followers/:id', component: FollowersListComponent, title: 'Seguidores' },
            { path: 'follows/:id', component: FollowsListComponent, title: 'Seguidos' },
            { path: 'group/:id', component: GroupChatComponent, title: 'Chat' },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]},
        { path: '', redirectTo: 'presentation', pathMatch: 'full' },
        { path: '**', redirectTo: 'presentation', pathMatch: 'full' }
    ]},
    { path: '', redirectTo: 'bolas/presentation', pathMatch: 'full' },
    { path: '**', redirectTo: 'bolas/presentation', pathMatch: 'full' }
];
