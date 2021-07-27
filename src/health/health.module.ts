import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//shared modules
import { SharedModule } from './shared/shared.module';


//guards
import { AuthGuard } from '../auth/shared/guards/auth.guards';


export const ROUTES: Routes = [
    { path: 'meals', canActivate: [AuthGuard], loadChildren: () => import('./meals/meals.module').then(m => m.MealsModule) },
    { path: 'workouts', canActivate: [AuthGuard], loadChildren: () => import('./workouts/workouts.module').then(m => m.WorkoutsModule) },
    { path: 'schedule', canActivate: [AuthGuard], loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule) }

]

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
        SharedModule.forRoot()
    ]

})

export class HealthModule { }