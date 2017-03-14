import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import {forwardRef, Directive, Attribute} from '@angular/core';

declare var mu: any, console: any;

@Directive({
    selector: '[mVFollow][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MVFollow),
            multi: true
        }
    ]
})

/**
 * mVFollow
 * 当一个值有值时, 另外一个值也必须有值
 */
export class MVFollow implements Validator {
    constructor(@Attribute('mVFollow') public mVFollow: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {

        // self value
        let v: any = c.value;

        // // control vlaue
        let eq: any = c.root.get(this.mVFollow).value;

        if (mu.isExist(v)) {
            return eq ? null : {
                mVFollow: '当一个值有值时, 另外一个值也必须有值'
            };
        }

        return null;
    }
}
