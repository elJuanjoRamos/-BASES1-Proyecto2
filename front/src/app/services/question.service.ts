import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  URI = 'https://db1-proyecto2.herokuapp.com';
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  get_pregunta() {
    return this.http.get<any>(`${this.URI}/question/get_all`).pipe(map(data => {
          return data;
      }));
  }
  get_encuesta() {
    return this.http.get<any>(`${this.URI}/encuesta/get_all`).pipe(map(data => {
          return data;
      }));
  }


  post(information:any) {    
    let data = JSON.stringify(information);

    var headers = new HttpHeaders({'Content-Type': 'application/json' });
    return this.http.post(`${this.URI}/question/add/`, data, { headers, responseType: 'blob' as 'json' }).pipe(map(data => {
        return data;
    }));
}

delete(id_country:any) {
  var headers = new HttpHeaders({'Content-Type': 'application/json'});
  return this.http.delete(`${this.URI}/question/delete/${id_country}`, { headers }).pipe(map(data => {
    console.log(data);
      return data;
  }));
}

put(any:any, id:any) {
    let data = JSON.stringify(any);
    var headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put(`${this.URI}/question/update/${id}`, data, { headers }).pipe(map(data => {
        return data;
    }));
}



}
