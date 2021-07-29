import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/auth/shared/shared.module';

//components
import { MealFormComponent } from './components/meal-form/meal-form.component'

//containers
import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.componet';

export const ROUTES: Routes = [

    { path: '', component: MealsComponent },
    { path: 'new', component: MealComponent }

]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SharedModule
    ],
    declarations: [
        MealsComponent,
        MealComponent,
        MealFormComponent

    ],
    providers: []
})

export class MealsModule { }