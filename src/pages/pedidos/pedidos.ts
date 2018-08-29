import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ViewController,ToastController,ModalController , AlertController } from 'ionic-angular';
import { MesasProvider,Pedido} from '../../providers/mesas/mesas';
import { FabContainer } from 'ionic-angular';
import {ItemPedidoPage } from '../item-pedido/item-pedido';
/**
 * Generated class for the PedidosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
  model: any;
  Pedidos: any[];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController,public viewCtrl: ViewController,public service: MesasProvider, private toast: ToastController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.model = this.navParams.get("model");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosPage');
  }

  ionViewWillEnter() {
    this.onUpdateList()
  }
  onUpdateList(){
      if(this.model.Id){
              this.service.getMesasPedidos(this.model.Id)
              .then((result: any[]) => {
              this.Pedidos = result;
              console.log(this.Pedidos);
              })
              .catch(() => {
                this.toast.create({ message: 'Erro ao carregar Lista.', duration: 3000, position: 'botton' }).present();
              });
      }
  }


  onRemoveItem(item){
    item.Status = "CANCELADO"
    item.DataPedidoPronto =  new Date();
    this.service.addPedido(item).then((data) => {
      console.log(data);
      this.onUpdateList();
    });

  }

  onClickList(item){
    
    let modal = this.modalCtrl.create(ItemPedidoPage, {model : item });
    
    modal.onDidDismiss(review => {
        if(review){
          console.log(review)  
          this.onUpdateList();
          }
    });
    
   modal.present();
  }

  onEditeItem(item){
    console.log(item);

  }
  onCreateItem(event){

      let alert = this.alertCtrl.create({
        title: 'Atenção',
        message: 'Deseja criar novo PEDIDO ?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.addPedido();
            }
          }
        ]
      });
      alert.present();
    

  }
  addPedido(){
    if(this.model.Id != null){
      var pedido =  new Pedido();
      pedido.Id = 0;
      pedido.ClienteId = 2;
      pedido.DataPedidoFeito  =  new Date();
      pedido.DataPedidoPronto =  new Date();
      pedido.MesaId = this.model.Id;
      pedido.Status = "AGUARDANDO";
      pedido.FuncionarioId = this.service.funcionario.Id;
      pedido.ClienteId = 2;

      this.service.addPedido(pedido).then((data) => {
        console.log(data);
        this.onUpdateList();
      });
  }
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
}


