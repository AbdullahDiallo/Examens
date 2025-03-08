import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 



import { TeacherListComponent } from './components/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './components/teacher-detail/teacher-detail.component';
import { TeacherAddComponent } from './components/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './components/teacher-edit/teacher-edit.component';

@NgModule({
  declarations: [
    TeacherListComponent,
    TeacherDetailComponent,
    TeacherAddComponent,
    TeacherEditComponent
  ],
  imports: [
    CommonModule,        
    FormsModule,          
    ReactiveFormsModule,  
    RouterModule          
  ],
  exports: [
    TeacherListComponent,
    TeacherDetailComponent,
    TeacherAddComponent,
    TeacherEditComponent
  ]
})
export class TeachersModule { }
