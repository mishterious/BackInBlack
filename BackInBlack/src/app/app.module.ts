
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AllComponent } from './all/all.component';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './all/edit/edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { WriteComponent } from './write/write.component';

@NgModule({
  declarations: [
    AppComponent,
    AllComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    ReviewsComponent,
    WriteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
