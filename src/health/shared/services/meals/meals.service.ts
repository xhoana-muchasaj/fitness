import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from './../../../../store';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { of } from "rxjs";
import { tap } from 'rxjs/operators';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';


export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists?: () => boolean
}

@Injectable()
export class MealsService {

    meals$: Observable<Meal[]> | Observable<any[]> = this.db.list(`meals/${this.uid}`)
        .snapshotChanges()/////ask erlandinnnnnnnn
        .pipe(tap(next => this.store.set('meals', next)));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}

    getMeal(key: string) {

        if (!key) return of({}) //in rxjs 6 its not used any more Observable.of({})
    

        return this.store.select<Meal[]>('meals')
            .filter(Boolean) //if the store is empty this boolean will stop te stream 
            .map(meals => meals.find((meal: any) => meal.key === key));
        // .map( meals => meals.find((meal:Meal) => meal.$key === key)); //ask erlandin
    }

    get uid() {
        return this.authService.user?.uid

    }

    addMeal(meal: Meal) {
        return this.db.list(`meals/${this.uid}`).push(meal)
    }

    updateMeal(key: string, meal: Meal) {
        return this.db.object(`meals/${this.uid}/${key}`).update(meal);
    }

    removeMeal(payload: any) {
        //passed this way because we are using snapshotChanges() 
        //and as meal we return the payload that has the key inside and the other info
        return this.db.list(`meals/${this.uid}`).remove(payload.key)
    }

    
}