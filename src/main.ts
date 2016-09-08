import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from './ng-module';

import './views/common/styles.scss';

platformBrowserDynamic().bootstrapModule(AppModule);
