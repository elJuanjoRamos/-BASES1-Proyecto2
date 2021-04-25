import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  URI = 'http://localhost:3000';
  headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

  constructor(private http: HttpClient) { }

  get_consulta(id_consulta: number) {
    return this.http.get<any>(`${this.URI}/consulta/${id_consulta}`).pipe(map(data => {
          return data;
      }));
  }
}
