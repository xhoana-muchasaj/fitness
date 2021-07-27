import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from './../../../../store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from './../../../../auth/shared/services/auth/auth.services';


export interface Meal {
    name: string,
    ingredients: string[],
    timestamp: number,
    $key: string,
    $exists: () => boolean
}

@Injectable()
export class MealsService {
    
    meals$: Observable<Meal[]>|Observable<any> = this.db.list(`meals/${this.uid}`)
    .valueChanges()
    .do(next=> this.store.set('meals', next));

    constructor(
        private store: Store,
        private db: AngularFireDatabase,
        private authService: AuthService
    ) {}

    get uid() {
        // return this.authService.user.uid
        return 'tD2yShTmegXXYSOHsbtcMj36LFn2'
      }
}