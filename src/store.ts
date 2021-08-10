import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs'; // using from 'rxjs/BehaviorSubject' fails in prod build

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';

import { User } from './auth/shared/services/auth/auth.services';
import { Meal } from './health/shared/services/meals/meals.service';
import { Workout } from './health/shared/services/workouts/workouts.service';

export interface State {
  user: User | undefined,
  meals: Meal[] | undefined,
  workouts: Workout[] | undefined,
  [key: string]: any
}

//object of type state that is needed to pass to the BehaviorSubject 
//for the initialization of the store
const state: State = {
  user: undefined,
  meals: undefined,
  workouts: undefined

};

export class Store {

  private subject = new BehaviorSubject<State>(state); //creates a new instance
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
