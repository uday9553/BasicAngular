import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './Services/Token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TokenInterceptor,{provide: HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
