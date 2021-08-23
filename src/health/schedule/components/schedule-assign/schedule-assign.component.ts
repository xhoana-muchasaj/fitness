import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Meal } from '../../../shared/services/meals/meals.service';
import { Workout } from '../../../shared/services/workouts/workouts.service';

@Component({
  selector: 'schedule-assign',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-assign.component.scss'],
  templateUrl: 'schedule-assign.component.html'
})
export class ScheduleAssignComponent implements OnInit {
  
  private selected: string[] = [];

  @Input()
  section: any;

  @Input()
  list?: Meal[] | Workout[];

  @Output()
  update = new EventEmitter<any>();

  @Output()
  cancel = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.list)
      this.selected = [...this.section.assigned];
      
  }

  toggleItem(name: string) {
    if (this.exists(name)) {
      this.selected = this.selected.filter(item => item !== name);
    } else {
      this.selected = [...this.selected, name];
    }
  }

  getRoute(name: string) {
    return [`../${name}/new`];
  }

  exists(name: string) {
    return !!~this.selected.indexOf(name);
  }

  updateAssign() {
    console.log('UPDATE BUTTON IN THE MODAL',this.selected)
    this.update.emit({
      [this.section.type]: this.selected
    });
  }

  cancelAssign() {
    this.cancel.emit();
  }

}