import { Component } from '@angular/core';
import { NavController, ModalController, NavParams  } from 'ionic-angular';
import { MesasProvider, Pedido } from '../../providers/mesas/mesas';
import { PedidosPage } from '../pedidos/pedidos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   mesas : any;
   funcionario: any;
   pedido : Pedido;
   searchTerm: string = '';
   mesasList : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public service: MesasProvider) {
    this.funcionario = this.navParams.get("model");
   }

  ionViewWillEnter() {
    this.onUpdateList()
  }

  onUpdateList(){  
    this.service.getMesas().then((data) => {
      console.log(data);
      this.mesas =  data;
      this.mesasList = data;
    });
  }
  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  onClickList(item){
    let modal = this.modalCtrl.create(PedidosPage, { model : item });
    modal.onDidDismiss(review => {
                this.onUpdateList();      
    });
   modal.present();
  }


  setFilteredItems() {
 
    this.mesasList  = this.filterItems(this.searchTerm);

  }

  filterItems(searchTerm){
    if(this.mesas){
        return this.mesas.filter((item) => {
            return item.Nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });   
    } 
    return undefined;
  }


  backup(){
    this.pedido =  new Pedido();

    this.pedido.ClienteId = 2;
    this.pedido.DataPedidoFeito  =  new Date();
    this.pedido.DataPedidoPronto =  new Date();
    this.pedido.MesaId = 1;
    this.pedido.Status = "AGUARDANDO";
    this.pedido.FuncionarioId = 2;
    this.pedido.ClienteId = 2;

    this.service.addPedido(this.pedido).then((data) => {
      console.log(data);

    });
  }
}
