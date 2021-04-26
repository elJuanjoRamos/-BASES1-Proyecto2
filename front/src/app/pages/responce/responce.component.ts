import { Component, OnInit } from '@angular/core';
import { ResponceService } from 'src/app/services/responce.service';

declare var $:any;

@Component({
  selector: 'app-responce',
  templateUrl: './responce.component.html'
})
export class ResponceComponent implements OnInit {

  array_correct_responces = [];
  array_posible_responces = [];
  p: number = 1;
  searchText;
  responce: any;
  question:string;
  answer:string;
  constructor(private responce_service: ResponceService) {
    this.responce_service.get_all().subscribe((data) => {
      this.array_correct_responces = data;
    });
  }

  ngOnInit(): void {

  }

  


  set_info(data:any) {
    this.responce = data;
    console.log(data);
    this.answer = this.responce.respuesta;
    this.question = this.responce.pregunta;

    this.responce_service.get_posible_respuesta(this.responce.idPregunta).subscribe((data) =>{
      this.array_posible_responces = data;
    });
  }
  update_answer(id_answer : number) {
    var data = {
      "answer" : id_answer 
    }
    this.responce_service.put(data, this.responce.id).subscribe((data) => {
      console.log(data)
      this.responce_service.get_all().subscribe((data) => {
        this.array_correct_responces = data;
      });
      $('#modalEditar').modal('hide');
    });
  }
}
