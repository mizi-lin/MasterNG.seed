import {NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';
import {forwardRef, Directive, Attribute} from '@angular/core';

declare var mu: any, console: any;

@Directive({
    selector: '[mVEquals]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MVEquals),
            multi: true
        }
    ]
})

export class MVEquals implements Validator {
    constructor(@Attribute('mVEquals') public mVEquals: string,
                @Attribute('mReverse_') public mReverse_: string) {

    }

    private get isReverse(): boolean {
        if (!this.mReverse_) return false;
        return this.mReverse_ === 'true' ? true : false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        let v = c.value;

        // control vlaue
        let e = c.root.get(this.mVEquals);

        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                mVEquals: false
            };
        }

        // value equal and mReverse_
        if (e && v === e.value && this.isReverse) {
            delete e.errors['mVEquals'];
            if (!Object.keys(e.errors).length) e.setErrors(null);
        }

        // value not equal and mReverse_
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({
                mVEquals: false
            });
        }

        return null;
    }
}
