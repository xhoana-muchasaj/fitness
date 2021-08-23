import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, Subject } from 'rxjs';

import { Meal } from '../meals/meals.service';
import { Workout } from '../workouts/workouts.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/withLatestFrom';

import { switchMap } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../../../auth/shared/services/auth/auth.service';


export interface ScheduleItem {
  meals: Meal[] | any,
  workouts: Workout[] | any,
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,
  [key: string]: any
}

@Injectable()
export class ScheduleService {

  private date$ = new BehaviorSubject(new Date());
  private section$ = new Subject();
  private itemList$ = new Subject();

  items$ = this.itemList$
    .withLatestFrom(this.section$)
    .map(([items, section]: any[]) => {

      const id = section.data.$key;

      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      };

      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload);
      }

    });

  selected$ = this.section$
    .pipe(tap((next: any) => this.store.set('selected', next)));


  //list of items dispalyed in the modal (meals or workouts)
  list$ = this.section$
    .map((value: any) => {
      this.store.value[value.type]
    })
    .pipe(tap((next: any) => {
      this.store.set('list', next)
    }));


  schedule$: Observable<ScheduleItem[]> | Observable<any> = this.date$
    .pipe(tap((next: any) => {
      this.store.set('date', next)
    }))
    .map((day: any) => {
      console.log(day)

      const startAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ).getTime();

      const endAt = (
        new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
      ).getTime() - 1;

      return { startAt, endAt };

    })
    .pipe(
      switchMap(async ({ startAt, endAt }: any) => {
        this.getSchedule(startAt, endAt)
      })
    )
    .map((data: any) => {

      const mapped: ScheduleList = {};
      if (data) {
        debugger
        for (const prop of data) {
          if (!mapped[prop.section]) {
            mapped[prop.section] = prop;
          }
        }

      }
      return mapped;
    })
    .pipe(tap((next: any) => this.store.set('schedule', next)));


  constructor(
    private store: Store,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) { }

  updateItems(items: string[]) {
    this.itemList$.next(items);
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  get uid() {
    return this.authService.user?.uid;
  }
  selectSection(event: any) {
    this.section$.next(event);
  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);
  }


  private getSchedule(startAt: any, endAt: any) {


    return this.db.list(`schedule/${this.uid}`, ref => {
      return ref.orderByChild('timestamp').startAt(startAt).endAt(endAt)  //substituted query:{.......}
    })

  }
}