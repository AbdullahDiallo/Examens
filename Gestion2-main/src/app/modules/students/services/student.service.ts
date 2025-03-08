import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  birthDate: string; 
  gender: string;
  niveau: string;
  nationality: string;
  matricule: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8081/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    console.log('Chargement des étudiants...');
    return this.http.get<Student[]>(this.apiUrl);
  }

 
  getStudentById(id: number): Observable<Student> {
    return this.http.get<Student>(this.apiUrl, { params: { id: id.toString() } });
  }
  

 
  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

 
  updateStudent(id: number, student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
