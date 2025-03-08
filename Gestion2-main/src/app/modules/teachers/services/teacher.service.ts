import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teacher {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  specialization: string;
  nationality: string;
}

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:8082/professeurs'; 

  constructor(private http: HttpClient) {}

  
  getTeachers(): Observable<Teacher[]> {
    console.log('Chargement des professeurs...');
    return this.http.get<Teacher[]>(this.apiUrl);
  }


  
  getTeacherById(id: number): Observable<Teacher> {
      return this.http.get<Teacher>(this.apiUrl, { params: { id: id.toString() } });
    }
    

  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

 
  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  }


  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
