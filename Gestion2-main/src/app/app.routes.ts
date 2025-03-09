import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListComponent } from './modules/students/components/student-list/student-list.component';
import { StudentDetailComponent } from './modules/students/components/student-detail/student-detail.component';
import { StudentAddComponent } from './modules/students/components/student-add/student-add.component';
import { StudentEditComponent } from './modules/students/components/student-edit/student-edit.component';

import { TeacherListComponent } from './modules/teachers/components/teacher-list/teacher-list.component';
import { TeacherDetailComponent } from './modules/teachers/components/teacher-detail/teacher-detail.component';
import { TeacherAddComponent } from './modules/teachers/components/teacher-add/teacher-add.component';
import { TeacherEditComponent } from './modules/teachers/components/teacher-edit/teacher-edit.component';

import { CourseListComponent } from './modules/courses/components/course-list/course-list.component';
import { CourseDetailComponent } from './modules/courses/components/course-detail/course-detail.component';
import { CourseAddComponent } from './modules/courses/components/course-add/course-add.component';
import { CourseEditComponent } from './modules/courses/components/course-edit/course-edit.component';

import { ClassListComponent } from './modules/classes/components/class-list/class-list.component';
import { ClassDetailComponent } from './modules/classes/components/class-detail/class-detail.component';
import { ClassAddComponent } from './modules/classes/components/class-add/class-add.component';
import { ClassEditComponent } from './modules/classes/components/class-edit/class-edit.component';

import { TimetableListComponent } from './modules/timetable/components/timetable-list/timetable-list.component';
import { TimetableDetailComponent } from './modules/timetable/components/timetable-detail/timetable-detail.component';
import { TimetableAddComponent } from './modules/timetable/components/timetable-add/timetable-add.component';
import { TimetableEditComponent } from './modules/timetable/components/timetable-edit/timetable-edit.component';

import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
  // 🏠 Accueil
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },

  // 👨‍🎓 Étudiants
  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentAddComponent },
  { path: 'students/detail/:id', component: StudentDetailComponent },
  { path: 'students/edit/:id', component: StudentEditComponent},

  // 👨‍🏫 Enseignants
  { path: 'teachers', component: TeacherListComponent },
  { path: 'teachers/add', component: TeacherAddComponent },
  { path: 'teachers/detail/:id', component: TeacherDetailComponent  },
  { path: 'teachers/edit/:id', component: TeacherEditComponent },

  // 📚 Cours
  { path: 'courses', component: CourseListComponent },
  { path: 'courses/add', component: CourseAddComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'courses/edit/:id', component: CourseEditComponent},

  // 🏫 Classes
  { path: 'classes', component: ClassListComponent },
  { path: 'classes/add', component: ClassAddComponent },
  { path: 'classes/:id', component: ClassDetailComponent},
  { path: 'classes/edit/:id', component: ClassEditComponent },

  // 🕒 Emplois du temps
  { path: 'timetables', component: TimetableListComponent },
  { path: 'timetables/add', component: TimetableAddComponent },
  { path: 'timetables/detail/:id', component: TimetableDetailComponent},
  { path: 'timetables/edit/:id', component: TimetableEditComponent },

  // 🔀 Redirection des URLs inconnues vers la page d'accueil
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
