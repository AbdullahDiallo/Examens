import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    CourseEditComponent,
    CourseAddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [CourseService],
  exports: [
    CourseListComponent,
    CourseDetailComponent,
    CourseEditComponent,
    CourseAddComponent
  ]
})
export class CoursModule { }
