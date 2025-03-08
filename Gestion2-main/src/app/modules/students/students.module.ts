import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentAddComponent } from './components/student-add/student-add.component';
import { StudentEditComponent } from './components/student-edit/student-edit.component';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentDetailComponent,
    StudentAddComponent,
    StudentEditComponent
  ],
  imports: [
    CommonModule,        
    FormsModule,          
    ReactiveFormsModule,  
    RouterModule          
  ],
  exports: [
    StudentListComponent,
    StudentDetailComponent,
    StudentAddComponent,
    StudentEditComponent
  ]
})
export class StudentsModule { }
