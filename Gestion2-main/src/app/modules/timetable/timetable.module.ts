import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TimetableAddComponent } from './components/timetable-add/timetable-add.component';
import { TimetableDetailComponent } from './components/timetable-detail/timetable-detail.component';
import { TimetableEditComponent } from './components/timetable-edit/timetable-edit.component';
import { TimetableListComponent } from './components/timetable-list/timetable-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'timetable', component: TimetableListComponent },
  { path: 'timetable/add', component: TimetableAddComponent },
  { path: 'timetable/:id', component: TimetableDetailComponent },
  { path: 'timetable/edit/:id', component: TimetableEditComponent }
];

@NgModule({
  declarations: [
    TimetableAddComponent,
    TimetableDetailComponent,
    TimetableEditComponent,
    TimetableListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: []
})
export class TimetableModule { }
