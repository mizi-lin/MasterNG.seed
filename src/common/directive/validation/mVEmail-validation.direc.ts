import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import {forwardRef, Directive, Attribute} from '@angular/core';
import {CONST} from '../../const';

declare var mu: any, console: any;

@Directive({
    selector: '[mVEmail][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MVEmail),
            multi: true
        }
    ]
})

/**
 * mVEmail
 * 当一个值有值时, 另外一个值也必须有值
 */
export class MVEmail implements Validator {
    constructor(@Attribute('mVEmail') public mVEmail: string) {
    }

    validate(c: AbstractControl): { [key: string]: any } {
        let v: any = c.value;

        return v && new RegExp(CONST.REGX.EMAIL).test(v) ? null : {
            mVEmail: 'Email format error'
        };
    }
}
