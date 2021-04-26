import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponceService {

  URI = 'http://localhost:3000/answer';
  headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  get_all() {
    return this.http.get<any>(`${this.URI}/get_all`).pipe(map(data => {
        console.log(data);
        return data;
      }));
  }

  get_posible_respuesta(id_pregunta:number){
    return this.http.get<any>(`${this.URI}/posible/${id_pregunta}`).pipe(map(data => {
      return data;
    }));
  }

  put(any:any, id:any) {
    let data = JSON.stringify(any);
    var headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`${this.URI}/update/${id}`, data, { headers }).pipe(map(data => {
      console.log(data);
        return data;
    }));
}
}
