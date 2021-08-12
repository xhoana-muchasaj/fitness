import { WorkoutsService } from './../../../shared/services/workouts/workouts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from 'store';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ScheduleService,ScheduleItem } from '../../../shared/services/schedule/schedule.service';
import { Meal, MealsService } from 'src/health/shared/services/meals/meals.service';
import { Workout } from 'src/health/shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  templateUrl:'schedule.component.html'
})
export class ScheduleComponent implements OnInit, OnDestroy {

  open = false;

  date$?: Observable<Date>;
  selected$?: Observable<any>;
  list$?: Observable<Meal[] | Workout[]>;
  schedule$?: Observable<ScheduleItem[]>;
  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private mealsService: MealsService,
    private workoutsService: WorkoutsService,
    private scheduleService: ScheduleService
  ) {}

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  ngOnInit() {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');

    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.scheduleService.list$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  //   assignItem(items: string[]) {
  //   this.scheduleService.updateItems(items);
  //   this.closeAssign();
  // }

  closeAssign() {
    this.open = false;
  }

}
// export class ScheduleComponent implements OnInit, OnDestroy {

//   open=false;

//   date$?: Observable<Date>;
//   schedule$?: Observable<ScheduleItem[]>;
//   selected$?: Observable<any>;
//   list$?: Observable<Meal[]|Workout[]>;
//   subscriptions: Subscription[] = [];

//   constructor(
//     private store: Store,
//     private scheduleService: ScheduleService,
//     private mealsService:MealsService,
//     private workoutsService:WorkoutsService
//   ) {}

//   changeDate(date: Date) {
//     this.scheduleService.updateDate(date);
//   }

//   changeSection(event: any) {
//     // console.log('event',event)
//     this.open=true;
//     this.scheduleService.selectSection(event);
//   }


//   ngOnInit() {
//     this.date$ = this.store.select('date');
//     this.schedule$ = this.store.select('schedule');
//     this.selected$ = this.store.select('selected');
//     this.list$ = this.store.select('list');

//     this.subscriptions = [
//       this.scheduleService.schedule$.subscribe(),
//       this.scheduleService.selected$.subscribe(),
//       this.scheduleService.list$.subscribe(),
//       this.scheduleService.items$.subscribe(),
//       this.mealsService.meals$.subscribe(),
//       this.workoutsService.workouts$.subscribe()
//     ];
//   }

//   ngOnDestroy() {
//     this.subscriptions.forEach(sub => sub.unsubscribe());
//   }

//   assignItem(items: string[]) {
//     this.scheduleService.updateItems(items);
//     this.closeAssign();
//   }

//   closeAssign() {
//     this.open = false;
//   }

// }

