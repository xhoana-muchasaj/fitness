import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { ScheduleItem } from '../../../shared/services/schedule/schedule.service';

@Component({
  selector: 'schedule-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-section.component.scss'],
  templateUrl: 'schedule-section.component.html'
})
export class ScheduleSectionComponent {
  
  @Input()
  name?: string;

  @Input()
  section?: ScheduleItem;

  @Output()
  select = new EventEmitter<any>();

  onSelect(type: string, assigned: string[] = []) {
    const data = this.section;
    this.select.emit({
      type,
      assigned,
      data
    });
  }

}