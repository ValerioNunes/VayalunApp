import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController } from 'ionic-angular';
import { MesasProvider, ItemPedido } from '../../providers/mesas/mesas';
/**
 * Generated class for the CardapioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  Cardapio : any;
  CardapioList : any;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public viewCtrl: ViewController,public navParams: NavParams, public service: MesasProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardapioPage');
    this.onUpdateList();
  }

  onUpdateList(){
              this.service.getCardapio()
              .then((result: any[]) => {
              this.Cardapio    = result;
              this.CardapioList = result;
              console.log(this.Cardapio);
              })
              .catch(() => {
               // this.toast.create({ message: 'Erro ao carregar Lista.', duration: 3000, position: 'botton' }).present();
              });
  }


  setFilteredItems() {
 
    this.CardapioList = this.filterItems(this.searchTerm);

  }

  filterItems(searchTerm){
    if(this.Cardapio){
        return this.Cardapio.filter((item) => {
            return item.Descricao.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });   
    } 
    return undefined;
  }
  onClickList(item){
    if(item)
      this.viewCtrl.dismiss(item);
  }
  closeModal() {
    this.viewCtrl.dismiss();
  }
}
