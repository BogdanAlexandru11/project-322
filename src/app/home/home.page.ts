import { Component } from '@angular/core';
import * as tone from 'tone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public myVar = '';
    constructor() {}
    buttonClicked(num) {
        const test = new tone.Synth().toMaster();
        if (1 === num) {
            test.triggerAttackRelease('C#1', '4n');
            this.myVar = this.myVar + '4c1 ';
        }
        if (2 === num) {
            test.triggerAttackRelease('D#1', '4n');
            this.myVar = this.myVar + '4d1 ';
        }
        if (3 === num) {
            test.triggerAttackRelease('E#1', '4n');
            this.myVar = this.myVar + '4e1 ';
        }
        if (4 === num) {
            test.triggerAttackRelease('F#1', '4n');
            this.myVar = this.myVar + '4f1 ';
        }
        if (5 === num) {
            test.triggerAttackRelease('G#1', '4n');
            this.myVar = this.myVar + '4g1 ';
        }
        if (6 === num) {
            test.triggerAttackRelease('F#1', '4n');
            this.myVar = this.myVar + '4a1 ';
        }
        if (7 === num) {
            test.triggerAttackRelease('B#1', '4n');
            this.myVar = this.myVar + '4b1 ';
        }
        if (8 === num) {
            this.myVar = this.myVar + '- ';
        }
        if (9 === num) {
            this.myVar = this.myVar + '+ ';
        }
        if (10 === num) {
            this.myVar = this.myVar + 'oct ';
        }
        if (11 === num) {
            this.myVar = this.myVar + 'rest ';
        }
        if (12 === num) {
            this.myVar = this.myVar + '# ';
        }
    }

    reset() {
        this.myVar = '';
    }
}



