
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegisterComponent } from '../Register/register.component';



@NgModule({
  declarations: [
    HomeComponent,  
    AppComponent,
    RegisterComponent
 
  ],
  imports: [
    CommonModule,
    HttpClientModule,
     BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgModule
  ]
 
})
export class HomeModule { }
