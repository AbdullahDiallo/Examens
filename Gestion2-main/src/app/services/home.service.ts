import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private studentsUrl = 'http://localhost:8081/students';
  private teachersUrl = 'http://localhost:8082/professeurs';
  private coursesUrl = 'http://localhost:8084/cours';
  private classesUrl = 'http://localhost:8083/classrooms';

  constructor(private http: HttpClient) {}

  getTotalStudents(): Observable<number> {
    return this.http.get<any[]>(this.studentsUrl).pipe(
      map(students => students.length),
      catchError(() => of(0))
    );
  }

  getTotalTeachers(): Observable<number> {
    return this.http.get<any[]>(this.teachersUrl).pipe(
      map(professeurs => professeurs.length),
      catchError(() => of(0))
    );
  }

  getTotalCourses(): Observable<number> {
    return this.http.get<any[]>(this.coursesUrl).pipe(
      map(courses => courses.length),
      catchError(() => of(0))
    );
  }

  getTotalClasses(): Observable<number> {
    return this.http.get<any[]>(this.classesUrl).pipe(
      map(classes => classes.length),
      catchError(() => of(0))
    );
  }

  getAllStats(): Observable<{
    totalEtudiants: number;
    totalProfesseurs: number;
    totalCours: number;
    totalClasses: number;
  }> {
    return forkJoin({
      totalEtudiants: this.getTotalStudents(),
      totalProfesseurs: this.getTotalTeachers(),
      totalCours: this.getTotalCourses(),
      totalClasses: this.getTotalClasses(),
    });
  }
}
