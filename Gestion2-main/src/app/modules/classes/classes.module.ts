import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassListComponent } from './components/class-list/class-list.component';
import { ClassDetailComponent } from './components/class-detail/class-detail.component';
import { ClassAddComponent } from './components/class-add/class-add.component';
import { ClassEditComponent } from './components/class-edit/class-edit.component';

@NgModule({
  declarations: [
    ClassListComponent,
    ClassDetailComponent,
    ClassAddComponent,
    ClassEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ClassesModule { }
