import {enableProdMode} from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { disableDeprecatedForms, provideForms } from '@angular/forms';

// core
// import { API_PROVIDERS } from './core/api';
// import { PROJECTS_PROVIDERS } from './core/projects';

// routes
import { ROUTER_PROVIDERS } from './views/common/routes';

// httpClient (interceptor)
import { HttpClient } from './views/common/http-client';

// root component
import { App } from './views/app';

// common styles
import './views/common/styles.scss';

import {GLOBAL} from './views/common/global';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';


if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}


bootstrap(App, [

    // 全局变量
    GLOBAL,

    // API_PROVIDERS,
    HTTP_PROVIDERS,
    // PROJECTS_PROVIDERS,

    ROUTER_PROVIDERS,

    // provide(LocationStrategy, {useClass: HashLocationStrategy}),


    HttpClient,

    disableDeprecatedForms(),

    provideForms()

]).catch((error: Error) => console.error(error));
