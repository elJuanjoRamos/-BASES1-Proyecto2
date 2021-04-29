import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html'
})
export class QueryComponent implements OnInit {

  //VARIABLES 
  id_general:number = 0;
  names = ['nombre', 'nombre 1', 'nombre 2'];
  results: any;
  constructor(private dbservice: DatabaseService) { }
  p: number = 1;
  searchText;
  ngOnInit(): void {
  }

  send_query(id_query: number){
    this.id_general = id_query;
    this.dbservice.get_consulta(id_query).subscribe((data:any[]) =>{
      this.results = data;
      console.log(data)
    });
    
  }

}
