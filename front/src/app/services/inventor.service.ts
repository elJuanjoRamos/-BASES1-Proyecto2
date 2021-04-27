import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventorService {

  URI = 'http://localhost:3000/inventor';
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http:HttpClient) { }

  get_all(){
    return this.http.get<any>(`${this.URI}/inventos`).pipe(map(data => {
      return data;
  }));
  }
}
