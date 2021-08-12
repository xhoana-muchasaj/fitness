import { Component,Input,Output,EventEmitter ,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'schedule-days',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['schedule-days.component.scss'],
  templateUrl:'schedule-days.component.html'
 
})
export class ScheduleDaysComponent {
  days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  @Input()
  selected?: number;

  @Output()
  select = new EventEmitter<number>();

  selectDay(index: number) {
    this.select.emit(index);
  }
}