import { Component } from '@angular/core';
import * as tone from 'tone';
import {last} from 'rxjs/operators';


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
            this.myVar = this.myVar + '16d1 ';
        }
        if (3 === num) {
            test.triggerAttackRelease('E#1', '4n');
            this.myVar = this.myVar + '32e1 ';
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
            const myIndex = this.myVar.substr(0, this.myVar.length - 1).lastIndexOf(' ');
            if (this.myVar.length <= 5) {
                const myString = this.myVar.substr(0, this.myVar.length - 1);
                const match = /[a-zA-Z]/.exec(myString);
                if (match) {
                    let duration = parseInt(myString.substr(0, match.index));
                    console.log(duration);
                    duration = duration * 2;
                    if (duration > 32) {
                       duration = 32;
                    }
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + myString.substr(match.index) + ' ';
                    test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#1', duration + 'n');
                }
                console.log(this.myVar.substr(0, this.myVar.length - 1));
            } else {
                const lastInstructions = this.myVar.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                if (match) {
                    let duration = parseInt(lastInstructions.substr(0, match.index));
                    duration = duration * 2;
                    if (duration > 32) {
                        duration = 32;
                    }
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + lastInstructions.substr(match.index) + ' ';
                    test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#1', duration + 'n');
                }
            }
        }
        if (9 === num) {
            const myIndex = this.myVar.substr(0, this.myVar.length - 1).lastIndexOf(' ');
            if (this.myVar.length <= 6) {
                const myString = this.myVar.substr(0, this.myVar.length - 1);
                const match = /[a-zA-Z]/.exec(myString);
                if (match) {
                    let duration = parseInt(myString.substr(0, match.index));
                    console.log(duration);
                    duration = duration / 2;
                    if (duration < 2) {
                        duration = 1;
                    }
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + myString.substr(match.index) + ' ';
                    test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#1', duration + 'n');
                }
                console.log(this.myVar.substr(0, this.myVar.length - 1));
            } else {
                const lastInstructions = this.myVar.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                if (match) {
                    let duration = parseInt(lastInstructions.substr(0, match.index));
                    duration = duration / 2;
                    if (duration < 2) {
                        duration = 1;
                    }
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + lastInstructions.substr(match.index) + ' ';
                    test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#1', duration + 'n');
                }
            }
        }
        if (10 === num) {
            // this.myVar = this.myVar + 'oct ';
        }
        if (11 === num) {
            // this.myVar = this.myVar + 'rest ';
        }
        if (12 === num) {
            // this.myVar = this.myVar + '# ';
        }
    }

    reset() {
        this.myVar = '';
    }

    deleteLast() {
        const myIndex = this.myVar.substr(0, this.myVar.length - 1).lastIndexOf(' ');
        if (this.myVar.length <= 6) {
            this.myVar = '';
        } else {
                this.myVar = this.myVar.substr(0, myIndex) + ' ';
            }
        }
    play() {
        const playThis = new tone.Synth().toMaster();
        // // var synth = new Tone.FMSynth().toMaster()
        //
        // console.log('play');
        // const myArray = this.myVar.substring(0, this.myVar.length - 1).split(' ');
        // for ( let i = 0; i < myArray.length; i++){
        //     console.log(myArray[i]);
        //     const match = /[a-zA-Z]/.exec(myArray[i]);
        //     if (match) {
        //         const duration = parseInt(myArray[i].substr(0, match.index));
        //         // this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + lastInstructions.substr(match.index) + ' ';
        //         // playThis.triggerAttackRelease(myArray[i].substring(match.index, match.index + 1) + '#1', duration + 'n', tone.Time('4n') + tone.Time('8n'));
        //     }
        // }

        const part = new tone.Part(function(time, value){
            playThis.triggerAttackRelease(value.note, '8n', time, value.velocity);
        }, [{'time' : 0, 'note' : 'C3', 'velocity': 0.9},
            {'time' : '0:2', 'note' : 'C4', 'velocity': 0.5}
        ]).start(0);

    }
}



