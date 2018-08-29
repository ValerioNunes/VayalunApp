import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { DateTime } from 'ionic-angular';
/*
  Generated class for the MesasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MesasProvider {
  data: any;
  public funcionario : any;
  apiUrl = 'http://192.168.43.129/vayalun/api/'

  
  constructor(public http: HttpClient) {
    console.log('Hello MesasProvider Provider');
  }

  public getMesas(){
 
    return new Promise(resolve => {
 
      this.http.get(this.apiUrl+'MesaView')
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  public getCardapio(){
 
    return new Promise(resolve => {
 
      this.http.get(this.apiUrl+'ItemCardapioAPI')
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


  public getMesasPedidos(id){
 
    return new Promise(resolve => {
 
      this.http.get(this.apiUrl+'MesaView/'+ id)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  public getItensPedidos(id){
 
    return new Promise(resolve => {
 
      this.http.get(this.apiUrl+'ItemPedidoesAPI/'+ id)
        .map(res => res)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  public addPedido(data : Pedido) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'PedidoesAPI',
        JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public addItemPedido(data : ItemPedido) {

    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + 'ItemPedidoesAPI',
        JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public editItemPedido(data : ItemPedido) {

    return new Promise((resolve, reject) => {
      this.http.put(this.apiUrl + 'ItemPedidoesAPI/',
        JSON.stringify(data), {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public removeItemPedido(id) {

    return new Promise(resolve => {
      this.http.delete(this.apiUrl+'ItemPedidoesAPI/'+ id)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }


public login(data : RegisterCredentials) {

  return new Promise((resolve, reject) => {
    this.http.post(this.apiUrl + 'MesaView',
      JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
      .subscribe(res => {
        if(res != 'invalido'){
          this.funcionario = res
        }
        resolve(res);

      }, (err) => {
        reject(err);
      });
  });
}


}


export class RegisterCredentials{
  Id: number;
  Senha:  String;
}


export class ItemPedido{
  Id: number;
  Quantidade: number;
  Preco: number;
  PedidoId: number;
  ItemCardapioId: number;
}

export class Pedido {
  Id: number;
  DataPedidoFeito: Date;
  DataPedidoPronto: Date;
  Total: number;
  Status: string;
  ClienteId: number;
  MesaId: number;
  FuncionarioId:  number;
  ItemPedidosId:  any = [];
}

