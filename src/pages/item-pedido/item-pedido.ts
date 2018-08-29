import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController ,ModalController  } from 'ionic-angular';
import { MesasProvider, ItemPedido} from '../../providers/mesas/mesas';
import {  ViewController } from 'ionic-angular';
import { CardapioPage } from '../cardapio/cardapio';
/**
 * Generated class for the ItemPedidoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-pedido',
  templateUrl: 'item-pedido.html',
})
export class ItemPedidoPage {

  model : any;
  ItemPedido :  any;

  constructor(public navCtrl: NavController ,
              public viewCtrl: ViewController,
              public service: MesasProvider,
              private toast: ToastController, 
              public navParams: NavParams, 
              public modalCtrl: ModalController) {
    this.model = this.navParams.get("model");
   
  }

  ionViewWillEnter() {
    this.onUpdateList()
  }

  onUpdateList(){
      if(this.model != null){
              this.service.getItensPedidos(this.model.Id)
              .then((result: any[]) => {
                this.ItemPedido = result;
              console.log(this.ItemPedido);
              })
              .catch(() => {
                this.toast.create({ message: 'Erro ao carregar Lista.', duration: 3000, position: 'botton' }).present();
              });
      }
  }


  onRemoveItem(item){
    this.service.removeItemPedido(item.Id)
      .then(() => { 
        this.toast.create({ message: 'Removido com Sucesso.', duration: 3000, position: 'botton' }).present();
       this.onUpdateList()
      })
      .catch(() => {
        this.toast.create({ message: 'Erro ao Remover.', duration: 3000, position: 'botton' }).present();
      });

  }

  save(item) {

        if(item.Quantidade != 0){

          this.service.addItemPedido(item).then((data) => {
              console.log(data);
              this.onUpdateList();
              if(data == 'Sucessagem')
                  this.toast.create({ message: 'O Item do Pedido Alterado com Sucesso !', duration: 2000, position: 'botton' }).present();
              else
                  this.toast.create({ message: 'Ops, Erro na Alteração !', duration: 2000, position: 'botton' }).present();
        
            });
            //this.viewCtrl.dismiss(this.ItemPedido);
        }else
             this.toast.create({ message: 'O Pedido não pode ter Quantidade igual a 0 !', duration: 2000, position: 'botton' }).present();
  }
  onClickList(item){}

  onEditeItem(item){
    console.log(item);
  }

  onCreateItem(event){

    let modal = this.modalCtrl.create(CardapioPage);
    
    modal.onDidDismiss(review => {
        if(review){
            console.log(review)  
            if(this.model.Id != null){

                    let itemPedido = new ItemPedido();
                    itemPedido.Id = 0;
                    itemPedido.Preco = review.Preco;
                    itemPedido.Quantidade = 1;
                    itemPedido.ItemCardapioId = review.Id;
                    itemPedido.PedidoId = this.model.Id;

                    this.service.addItemPedido(itemPedido).then((data) => {
                    console.log(data);
                    this.onUpdateList();

                  });
            }
          }
    });
    
   modal.present();
  }
  public convertToNumber(event):number {  return +event; }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
