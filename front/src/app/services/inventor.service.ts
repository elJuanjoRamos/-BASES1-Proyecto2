import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventorService {

  URI = 'http://localhost:3000/inventor';
  
  constructor(private http:HttpClient) { }

  get_all(){
    return this.http.get<any>(`${this.URI}/inventos`).pipe(map(data => {
      return data;
    }));
  }
  get_Inventor(){
    return this.http.get<any>(`${this.URI}/get_all`).pipe(map(data => {
      return data;
    }));
  }

  put(any:any, id:any) {
    let data = JSON.stringify(any);
    var headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`${this.URI}/update/${id}`, data, { headers }).pipe(map(data => {
        return data;
    }));
}
}
