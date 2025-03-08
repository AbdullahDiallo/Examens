import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsModule } from './modules/students/students.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { CoursModule} from './modules/courses/courses.module';
import { ClassesModule } from './modules/classes/classes.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { AppRoutingModule } from './app.routes'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    BrowserAnimationsModule,
  
    StudentsModule,
    TeachersModule,
    CoursModule,
    ClassesModule,
    TimetableModule,
  
    
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
