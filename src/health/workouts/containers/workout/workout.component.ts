
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { WorkoutsService, Workout } from '../../../shared/services/workouts/workouts.service';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'workout',
  styleUrls: ['workout.component.scss'],
  templateUrl: 'workout.component.html'
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$?: Observable<Workout> | Observable<any>;
  subscription?: Subscription;

  constructor(
    private workoutsService: WorkoutsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.activeRoute.params
      .pipe(
        switchMap(params => { return this.workoutsService.getWorkout(params.id) })
      );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  async updateWorkout(event: Workout) {
    const key = this.activeRoute.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  async removeWorkout(event: Workout) {
    const key = this.activeRoute.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  backToWorkouts() {
    this.router.navigate(['workouts']);
  }
}

