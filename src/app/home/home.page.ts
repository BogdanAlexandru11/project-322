import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public buttons: Array<string>;
    // public myVar: string;
    // myVar: string;
    public counter = 1;
    public lastTapTime = 0;
    public myVar = '';
    public delay = 500;
    private timeoutDuration = 500;
    private myStr = '';
    // public myVar: string;

    // static myEvent(event) {
    //   console.log(event);
    // }

    constructor() {
        // this.buttons = ['1', '2/abc', '3/def', '4/ghi', '5/jkl', '6/mno', '7/pqrs', '8/tuv', '9/wxyz', '*/+', '0/_', '#/UP'];
    }


    buttonClicked(num) {
        const context = new AudioContext();
        const o = context.createOscillator();
        o.type = 'sine';
        o.connect(context.destination);
        o.start();

        const interval = window.setInterval(() => {
            o.stop();
            window.clearInterval(interval);
        }, 3000);

        if (1 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'a';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myStr = 'b';
                    this.myVar = this.myVar + 'b';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'c';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (2 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'a';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'b';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'c';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (3 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'd';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'e';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'f';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (4 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'g';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'h';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'i';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (5 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'j';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'k';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'l';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (6 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'm';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'n';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'o';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (7 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'p';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'q';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'r';
                } else if (this.counter === 4) {
                        this.timeoutDuration = this.timeoutDuration + this.delay;
                        this.counter = 0;
                        this.myVar = this.myVar + 's';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (8 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 't';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'u';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'v';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (9 === num) {
            const newDate = new Date();
            if (newDate.getTime() - this.lastTapTime < this.delay) {
                this.counter++;
                this.lastTapTime = new Date().getTime();
            } else {
                this.lastTapTime = new Date().getTime();
                this.counter = 1;
            }
            const interval = window.setInterval(() => {
                if (this.counter === 1) {
                    this.counter = 0;
                    this.myVar = this.myVar + 'w';
                    this.timeoutDuration = this.delay;
                } else if (this.counter === 2 ) {
                    this.counter = 0 ;
                    this.myVar = this.myVar + 'x';
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                } else if (this.counter === 3) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'y';
                } else if (this.counter === 4) {
                    this.timeoutDuration = this.timeoutDuration + this.delay;
                    this.counter = 0;
                    this.myVar = this.myVar + 'z';
                } else{
                    this.delay = 400;
                    this.counter = 0;
                }
                window.clearInterval(interval);
            }, this.timeoutDuration);
        }
        if (10 === num) {
            const newDate = new Date();
            this.myVar = this.myVar + '10';
            console.log(newDate.getTime());
        }
        if (11 === num) {
            const newDate = new Date();
            this.myVar = this.myVar + '11';
            console.log(newDate.getTime());
        }
        if (12 === num) {
            const newDate = new Date();
            this.myVar = this.myVar + '12';
            console.log(newDate.getTime());
        }
    }

    reset() {
    this.myVar = '';
    }
}



