import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

import { disableDeprecatedForms, provideForms } from '@angular/forms';

// core
// import { API_PROVIDERS } from './core/api';
// import { PROJECTS_PROVIDERS } from './core/projects';

// routes
import { ROUTER_PROVIDERS } from './views/routes';

// httpClient (interceptor)
import { HttpClient } from './views/http-client';

// root component
import { App } from './views/app';

// common styles
import './views/common/styles.scss';


if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}


bootstrap(App, [
    // API_PROVIDERS,
    HTTP_PROVIDERS,
    // PROJECTS_PROVIDERS,
    ROUTER_PROVIDERS,

    HttpClient,

    disableDeprecatedForms(),
    provideForms()

]).catch((error: Error) => console.error(error));
