import { 
  
  Component,
  OnInit, 
  ChangeDetectionStrategy,
  ViewChild,
  ViewEncapsulation,
  TemplateRef } from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
  } from 'date-fns';
  import { Subject } from 'rxjs';
  import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
    CalendarMonthViewDay
  } from 'angular-calendar';
  
  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    green: {
      primary: '#2EA82A',
      secondary: '#2EA82A'
    }
  };
  
@Component({
  selector: 'app-cal-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './cal-component.component.html',
  styleUrls: ['./cal-component.component.css']
})
export class CalComponentComponent implements OnInit {

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
   
  ngOnInit(){

  }

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  points :Number[] = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,1,2,2,2];
 
  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal) {}

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }


  addEvent(): void {
    for(let day = 1;day< this.points.length;day++){
      console.log(day);
      this.events.push({
        title: (this.points[day-1] > 0) ? 'Point earned : ' + this.points[day-1]: 'No point earned',
        start: startOfDay(new Date(2019,0,day)),
        end: endOfDay(new Date(2019,0,day)),
        color: (this.points[day-1] > 0) ?colors.green:colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      });
    }
    this.refresh.next();

  }
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (day.date.getDate() < this.points.length   && day.inMonth) {
        if(this.points[day.date.getDate()-1] < 0)
        day.cssClass = 'red-cell';
        else
        day.cssClass = 'green-cell';
      }
    });
    // this.addEvent();
  }

}