import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableAddComponent } from './timetable-add.component';

describe('TimetableAddComponent', () => {
  let component: TimetableAddComponent;
  let fixture: ComponentFixture<TimetableAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
