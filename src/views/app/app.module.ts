import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

/* App Root */
import { AppComponent }   from './app';

@NgModule({
    imports: [
        BrowserModule
    ],

    declarations: [ AppComponent ],

    bootstrap:    [ AppComponent ]
})
export class AppModule { }

