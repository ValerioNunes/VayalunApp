import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { PedidosPage } from '../pages/pedidos/pedidos';

import { ItemPedidoPage } from '../pages/item-pedido/item-pedido';
import { CardapioPage } from '../pages/cardapio/cardapio';

import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { FuncionariosProvider } from '../providers/funcionarios/funcionarios';
import { MesasProvider } from '../providers/mesas/mesas';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    PedidosPage,
    ItemPedidoPage,
    CardapioPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    PedidosPage,
    ItemPedidoPage,
    CardapioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FuncionariosProvider,
    MesasProvider
  ]
})
export class AppModule {}
