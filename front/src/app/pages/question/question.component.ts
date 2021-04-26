import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

declare var $:any;

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {

  //VARIABLES
  array_question = [];
  array_encuesta = [];
  showAletr:boolean = false;
  p: number = 1;
  searchText;
  id_general: number;
  question_general:string;

  constructor(private question_service:QuestionService) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.question_service.get_encuesta().subscribe((data:any[]) => {
      this.array_encuesta = data;
    });
    this.question_service.get_pregunta().subscribe((data:any[]) => {
      this.array_question = data;
    }); 
  }

  save_question(question: string, encuesta:number){
    if (question == "") {
      this.showAletr = true;
      return;
    }
    var data = {
      "pregunta" : question,
      "encuesta" :encuesta
    }
    this.question_service.post(data).subscribe((data) => {
      this.initialize();
      this.showAletr = false;
      $('#modalAgregar').modal('hide');
    });
  }



  delete(id_question:number){
    this.question_service.delete(id_question).subscribe((data) =>{
      this.initialize();
    });
  }


  set_query(id_query:number, query:string){
    this.id_general = id_query;
    this.question_general = query;
  }
  update_question(question: string, encuesta:number){
    if (question == "") {
      this.showAletr = true;
      return;
    }
    var data = {
      "pregunta" : question,
      "encuesta" :encuesta
    }
    this.question_service.put(data, this.id_general).subscribe((data) => {
      this.initialize();
      this.showAletr = false;
      $('#modalEditar').modal('hide');
    });
  }
}
