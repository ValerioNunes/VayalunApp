import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
 
/*
  Generated class for the FuncionariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FuncionariosProvider {
  data: any;
  apiUrl = 'http://localhost/vayalun/api/'

  constructor(public http: HttpClient) {
    console.log('Hello FuncionariosProvider Provider');
    this.data = null;
  }

  getfuncionarios(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get(this.apiUrl+'MesaView')
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  getCargos(){
 
    if (this.data) {
      return Promise.resolve(this.data);
    }
 
    return new Promise(resolve => {
 
      this.http.get(this.apiUrl+'cargoes')
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
 
  }

  createfuncionario(funcionario){

      return new Promise((resolve, reject) => {
        this.http.post(this.apiUrl + 'funcionarios',
          JSON.stringify(funcionario), {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
          })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
 
  }
 
  deletefuncionario(id){
 
    this.http.delete('funcionarios/' + id).subscribe((res) => {
      console.log(res);
    });   
 
  }
}
