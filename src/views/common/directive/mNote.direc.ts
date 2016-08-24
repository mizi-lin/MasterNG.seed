import {Component, OnDestroy} from '@angular/core';
import {GLOBAL} from '../global';
import {Observable} from 'rxjs';

@Component({
    selector: 'mNote',
    template: `{{title}}`
})

export class MNote implements OnDestroy {
    title: string;
    sub: any;

    constructor(private G: GLOBAL) {

        this.sub = this.httpStatus.subscribe(
            value => {

                switch (value) {
                    case 200:
                        this.title = '操作成功';
                        break;
                    case 401:
                        this.title = 'TOKEN 失效';
                        break;
                    case 404:
                        this.title = '页面不存在';
                        break;
                    case 500:
                        this.title = '操作失败';
                        break;
                }

                if (value) {
                    setTimeout(() => {
                        this.G.httpStatus = 0;
                        this.title = '';
                    }, 2000);
                }
            }
        );

    }

    httpStatus: Observable<any> = new Observable(observer => {
        setInterval(() => {
            observer.next(this.G.httpStatus);
        }, 500);
    });

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
