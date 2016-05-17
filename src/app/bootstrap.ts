import {provide} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {enableProdMode} from '@angular/core';

enableProdMode();

bootstrap(MainComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
