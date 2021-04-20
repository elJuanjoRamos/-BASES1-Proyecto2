import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  //VARIABLES
  showAlert:boolean = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login(username: string, password:string){
    if (username != 'admin' && password != 'admin') {
      this.showAlert = true;
      return;
    }
    this.router.navigate(['admin/home']);
  }
}