import { Component } from '@angular/core';
// import { ToneJs } from 'tone';
import * as tone from 'tone';


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
        const test = new tone.Synth().toMaster();
        // // const boppen = new ToneJs.Synth().toMaster();
        // // // var synth = new Tone.Synth().toMaster();
        test.triggerAttackRelease('C4', '8n');
        // const context = new AudioContext();
        // const o = context.createOscillator();
        // o.type = 'sine';
        // o.connect(context.destination);
        // o.start();
        //
        // const interval = window.setInterval(() => {
        //     o.stop();
        //     window.clearInterval(interval);
        // }, 3000);

        if (1 === num) {
            this.myVar = this.myVar + 'c';
        }
        if (2 === num) {
            this.myVar = this.myVar + 'd';
        }
        if (3 === num) {
            this.myVar = this.myVar + 'e';
        }
        if (4 === num) {
            this.myVar = this.myVar + 'f';
        }
        if (5 === num) {
            this.myVar = this.myVar + 'g';
        }
        if (6 === num) {
            this.myVar = this.myVar + 'a';
        }
        if (7 === num) {
            this.myVar = this.myVar + 'b';
        }
        if (8 === num) {
            this.myVar = this.myVar + '-';
        }
        if (9 === num) {
            this.myVar = this.myVar + '+';
        }
        if (10 === num) {
            this.myVar = this.myVar + 'oct';
        }
        if (11 === num) {
            this.myVar = this.myVar + 'rest';
        }
        if (12 === num) {
            this.myVar = this.myVar + '#';
        }
    }

    reset() {
    this.myVar = '';
    }
}



