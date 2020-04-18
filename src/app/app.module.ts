import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { DragLoadComponent } from './drag-load/drag-load.component';

@NgModule({
  declarations: [AppComponent, NewsComponent, DragLoadComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
