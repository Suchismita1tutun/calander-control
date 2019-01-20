import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalComponentComponent } from './cal-component.component';

describe('CalComponentComponent', () => {
  let component: CalComponentComponent;
  let fixture: ComponentFixture<CalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
