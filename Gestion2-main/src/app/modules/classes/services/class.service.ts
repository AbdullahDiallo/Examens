import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private apiUrl = 'http://localhost:8083/classrooms'; 

  constructor(private http: HttpClient) {}

  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClassById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addClass(classData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, classData);
  }

  updateClass(id: number, classData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, classData);
  }

  deleteClass(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
