import {Component, OnDestroy} from '@angular/core';
import {GLOBAL} from '../global';

@Component({
    selector: 'd-note',
    template: `
        <div class="content" *ngIf="G?.httpStatus >= 400">
            <h5>{{G?.httpError?.title}}</h5>
            <ol>
                <li *ngFor="let err of G.httpError.error.data">
                    {{err.message}}
                </li>
            </ol>
        </div>
    
        <div class="content" *ngIf="G?.httpStatus < 300">
            操作成功
        </div>
    `

})

export class $$NoteDirec implements OnDestroy {
    title: string;
    sub: any;

    constructor(private G: GLOBAL) {

        // this.sub = this.httpStatus.subscribe(
        //     httpStatus => {
        //
        //         switch (httpStatus) {
        //             case httpStatus > 0 && httpStatus < 300:
        //                 this.title = '操作成功';
        //                 break;
        //             case 401:
        //                 this.title = 'TOKEN 失效';
        //                 break;
        //             case 404:
        //                 this.title = '页面不存在';
        //                 break;
        //             case 500:
        //                 this.title = '操作失败';
        //                 break;
        //             default:
        //                 this.title = '操作失败';
        //                 break;
        //         }
        //
        //         if (httpStatus) {
        //             setTimeout(() => {
        //                 this.G.httpStatus = 0;
        //                 this.title = '';
        //             }, 2000);
        //         }
        //     }
        // );

    }

    // httpStatus: Observable<any> = new Observable(observer => {
    //     setInterval(() => {
    //         observer.next(this.G.httpStatus);
    //     }, 1000);
    // });

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
