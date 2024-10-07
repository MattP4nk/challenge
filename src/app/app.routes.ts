import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginGuardService } from './services/login-guard.service';

export const routes: Routes = [
    {path: '', component: DashboardComponent, canActivate:[LoginGuardService]},
    {path: 'login', component: LoginComponent}
];
