import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoCapitalizeFisrtComponent } from './components/demo-capitalize-fisrt/demo-capitalize-fisrt.component';
import { CapitalizeFirstDirective } from './Directives/capitalize-first.directive';
import { NumberCommaDotOnlyDirective } from './Directives/numberCommaDotOnly/number-comma-dot-only.directive';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DemoCapitalizeFisrtComponent,
    CapitalizeFirstDirective,
    NumberCommaDotOnlyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
