import { Component } from '@angular/core';


@Component({
    selector: 'home',
    template: `
    <h2>Home</h2>
    <h3>{{greeting}}</h3>
    <img src="/assets/images/image.png" alt="Angular">
  `
})

export class HomePage {
    greeting: string = 'Hello World! :)';
}

