import {Pipe, PipeTransform} from '@angular/core';
import {GLOBAL} from '../global';
import {DICT} from '../const';

declare var mu: any, console: any;

/**
 * 某个 value 对应的 name
 */
@Pipe({name: 'name'})
export class $$NamePipe implements PipeTransform {
    D: any;

    constructor(private G: GLOBAL) {
        this.D = DICT;
    }

    transform(value: string, key: string, options: any): any {

        options = mu.extend({
            parent: 'STATUS',
            source: 'D'
        }, options || {});

        return this[options.source][options.parent][key][value];
    }
}
