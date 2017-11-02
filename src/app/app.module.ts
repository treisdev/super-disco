import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { AboutPage } from '../pages/about/about';
import { ApiProvider } from '../providers/api/api';
import { AprovometroProvider } from '../providers/aprovometro/aprovometro';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [MyApp, HomePage, DetailPage, AboutPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { backButtonText: 'Voltar' }),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, DetailPage, AboutPage],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ApiProvider,
    AprovometroProvider
  ]
})
export class AppModule {}
