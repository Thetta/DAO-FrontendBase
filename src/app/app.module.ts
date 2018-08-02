import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard';
import { MetamaskNotInstalledComponent } from './metamask-not-installed';
import { MetamaskNotLoggedInComponent } from './metamask-not-logged-in';
import { PageNotFoundComponent } from './page-not-found';

@NgModule({
  declarations: [
	AppComponent,
	MetamaskNotInstalledComponent,
	MetamaskNotLoggedInComponent,
    PageNotFoundComponent
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	HttpClientModule,
	DashboardModule,
	AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
