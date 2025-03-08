import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableDetailComponent } from './timetable-detail.component';

describe('TimetableDetailComponent', () => {
  let component: TimetableDetailComponent;
  let fixture: ComponentFixture<TimetableDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
