import {Routes} from '@angular/router';
import {FeComponent} from './fe.component';
import {IndexComponent} from './index/index.component';

export const FeRoutes: Routes = [
    {
        path: '!',
        component: FeComponent,

        children: [
            {
                path: 'index',
                component: IndexComponent
            }
            // {
            //     path: 'topics',
            //     component: TopicWelcomeCpt,
            //     canActivate: [AuthGuide],
            //     data: {module: 'topics'}
            // }
        ]
    }

];
