import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private apiUrl = 'http://localhost:8085/timetables';

  constructor(private http: HttpClient) { }

  getAllTimetables(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTimetableById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getTimetablesByClassroomId(classroomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classroom/${classroomId}`);
  }

  addTimetable(timetable: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timetable);
  }

  deleteTimetable(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  updateTimetable(timetable: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${timetable.id}`, timetable);
  }
}
