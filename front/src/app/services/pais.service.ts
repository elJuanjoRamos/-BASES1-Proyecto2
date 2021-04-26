import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  URI = 'http://localhost:3000/pais/';
  headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

  constructor(private http: HttpClient) { }

  get_all() {
    return this.http.get<any>(`${this.URI}/get_all`).pipe(map(data => {
          return data;
      }));
  }

  


}
