import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from './../../../../store';

import { Observable } from 'rxjs/Observable';
import { of } from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import { AuthService } from './../../../../auth/shared/services/auth/auth.services';


export interface Workout {
    name: string,
    type: string, 
    strength: any,
    endurance: any,
    timestamp: number,
    $key: string,
    $exists?: () => boolean
}

@Injectable()
export class WorkoutsService {

    workouts$: Observable<Workout[]> | Observable<any[]> = this.db.list(`workouts/${this.uid}`)
        .snapshotChanges()/////ask erlandinnnnnnnn
        .do(next => this.store.set('workouts', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}

    getWorkout(key: string) {

        if (!key) return of({}); //in rxjs 6 its not used any more Observable.of({})

        return this.store.select<Workout[]>('workouts')
            .filter(Boolean) //if the store is empty this boolean will stop te stream 
            .map(workouts => workouts.find((workout: any) => workout.key === key));
        // .map( meals => meals.find((meal:Meal) => meal.$key === key)); //ask erlandin
    }

    get uid() {
        ///////////////////to  fix
        // return this.authService.user.uid

        return 'tD2yShTmegXXYSOHsbtcMj36LFn2'
    }
    
    addWorkout(workout: Workout) {
        return this.db.list(`workouts/${this.uid}`).push(workout)
    }

    updateWorkout(key: string, workout: Workout) {
        return this.db.object(`workouts/${this.uid}/${key}`).update(workout);
    }

    removeWorkout(payload: any) {
        //passed this way because we are using snapshotChanges() 
        //and as meal we return the payload that has the key inside and the other info
        return this.db.list(`workouts/${this.uid}`).remove(payload.key)
    }

    
}