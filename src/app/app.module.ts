import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

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
	HttpModule,
	DashboardModule,
	AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
