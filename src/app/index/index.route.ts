import {HelloWorldComponent} from './hello-world/hello-world.component';
import {CanActiveRoute} from '../common/can-active.route';

export const IndexRoutes = [
    {
        path: 'index',
        children: [
            {
                path: 'hello',
                component: HelloWorldComponent,
                canActivate: [CanActiveRoute],
                data: {module: 'index.hello', token: false}
            }
        ]
    }


];