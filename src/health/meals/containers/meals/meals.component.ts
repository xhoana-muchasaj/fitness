import { Store } from 'store';
import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Meal, MealsService } from './../../../shared/services/meals/meals.service';

@Component({
    selector: 'meals',
    styleUrls: ['meals.component.scss'],
    templateUrl: 'meals.component.html'
})
export class MealsComponent implements OnInit, OnDestroy {

    meals$?: Observable<Meal[]>;
    subscription?: Subscription;

    constructor(
        private store: Store,
        private mealsService: MealsService
    ) {}

    ngOnInit() {
      this.subscription = this.mealsService.meals$.subscribe()
      this.meals$ = this.store.select<Meal[]>('meals');
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe()
    }

    removeMeal(event: Meal) {
      this.mealsService.removeMeal(event);
    }

}