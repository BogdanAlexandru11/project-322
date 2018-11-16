import { Component } from '@angular/core';
import * as tone from 'tone';
import {last} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public octave = 1;
    public myVar = '';
    public hashtagPresent = false;
    public duration = 4;
    constructor() {}
    buttonClicked(num) {
        const test = new tone.Synth().toMaster();
        if (1 === num) {
            test.triggerAttackRelease('C' + this.octave, '4n');
            this.myVar = this.myVar + '4c' + this.octave + ' ';
        }
        if (2 === num) {
            test.triggerAttackRelease('D' + this.octave, '4n');
            this.myVar = this.myVar + '4d' + this.octave + ' ';
        }
        if (3 === num) {
            test.triggerAttackRelease('E' + this.octave, '4n');
            this.myVar = this.myVar + '4e' + this.octave + ' ';
        }
        if (4 === num) {
            test.triggerAttackRelease('F' + this.octave, '4n');
            this.myVar = this.myVar + '4f' + this.octave + ' ';
        }
        if (5 === num) {
            test.triggerAttackRelease('G' + this.octave, '4n');
            this.myVar = this.myVar + '4g' + this.octave + ' ';
        }
        if (6 === num) {
            test.triggerAttackRelease('F'  + this.octave, '4n');
            this.myVar = this.myVar + '4a' + this.octave + ' ';
        }
        if (7 === num) {
            test.triggerAttackRelease('B'  + this.octave, '4n');
            this.myVar = this.myVar + '4b' + this.octave + ' ';
        }
        if (8 === num) {
            const myIndex = this.myVar.substr(0, this.myVar.length - 1).lastIndexOf(' ');
            if (this.myVar.length <= 5) {
                const myString = this.myVar.substr(0, this.myVar.length - 1);
                const match = /[a-zA-Z]/.exec(myString);
                if (match) {
                    this.duration = parseInt(myString.substr(0, match.index), 10);
                    this.duration = this.duration * 2;
                    if (this.duration > 32) {
                       this.duration = 32;
                    }
                    if (myString.match(/#/)) {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + '#' + myString.substr(match.index) + ' ';
                        test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + myString.substr(match.index) + ' ';
                        test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
            } else {
                const lastInstructions = this.myVar.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                const matchPause = /[-]/.exec(lastInstructions);
                if (match) {
                    this.duration = parseInt(lastInstructions.substr(0, match.index), 10);
                    this.duration = this.duration * 2;
                    if (this.duration > 32) {
                        this.duration = 32;
                    }
                    if (lastInstructions.match(/#/)) {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + '#' + lastInstructions.substr(match.index) + ' ';
                        test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + lastInstructions.substr(match.index) + ' ';
                        test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
                if (matchPause) {
                    this.duration = parseInt(lastInstructions.substr(0, matchPause.index), 10);
                    this.duration = this.duration * 2;
                    if (this.duration > 32) {
                        this.duration = 32;
                    }
                    this.myVar = this.myVar.substring(0, myIndex) + ' ' + this.duration + '- ';
                }
            }
        }
        if (9 === num) {
            const myIndex = this.myVar.substr(0, this.myVar.length - 1).lastIndexOf(' ');
            if (this.myVar.length <= 6) {
                const myString = this.myVar.substr(0, this.myVar.length - 1);
                const match = /[a-zA-Z]/.exec(myString);
                if (match) {
                    this.duration = parseInt(myString.substr(0, match.index), 10);
                    this.duration = this.duration / 2;
                    if (this.duration < 2) {
                        this.duration = 1;
                    }
                    if (myString.match(/#/)) {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + '#' + myString.substr(match.index) + ' ';
                        test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + myString.substr(match.index) + ' ';
                        test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
            } else {
                const lastInstructions = this.myVar.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                const matchPause = /[-]/.exec(lastInstructions);
                if (match) {
                    this.duration = parseInt(lastInstructions.substr(0, match.index), 10);
                    this.duration = this.duration / 2;
                    if (this.duration < 2) {
                        this.duration = 1;
                    }
                    if (lastInstructions.match(/#/)) {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + '#' + lastInstructions.substr(match.index) + ' ';
                        test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + lastInstructions.substr(match.index) + ' ';
                        test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
                if (matchPause) {
                    this.duration = parseInt(lastInstructions.substr(0, matchPause.index), 10);
                    this.duration = this.duration / 2;
                    if (this.duration < 2) {
                        this.duration = 1;
                    }
                    this.myVar = this.myVar.substring(0, myIndex) + ' ' + this.duration + '- ';
                }
            }
        }
        if (10 === num) {
            this.octave = this.octave + 1;
            if (this.octave > 8 ) {
                this.octave = 1;
            }
        }
        if (11 === num) {
            this.myVar = this.myVar + '4- ';
        }

        if (12 === num) {
            if (this.myVar.length <= 6) {
                    if (this.myVar.match(/.*#.*$/)) {
                        this.hashtagPresent = true;
                    }
                    if (this.hashtagPresent === false) {
                        const myString = this.myVar.substr(0, this.myVar.length - 1);
                        const match = /[a-zA-Z]/.exec(myString);
                        if (match) {
                            this.duration = parseInt(this.myVar.substr(0, this.myVar.length - 1).substr(0, match.index), 10);
                            this.myVar = this.myVar.substr(0, match.index) + '#' + this.myVar.substring(match.index);
                            test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                        }
                    } else {
                        const myString = this.myVar.substr(0, this.myVar.length - 1);
                        const match = /[a-zA-Z]/.exec(myString);
                        const matchHashtag = /#/.exec(myString);
                        if (match) {
                            if (matchHashtag) {
                                this.duration = parseInt(this.myVar.substr(0, this.myVar.length - 1).substr(0, match.index), 10);
                                this.myVar = this.duration + myString.substring(0, matchHashtag.index - 1) + myString.substring(matchHashtag.index + 1) + ' ';
                                test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                                this.hashtagPresent = false;
                            }
                        }
                    }
                } else {
                const myIndex = this.myVar.substr(0, this.myVar.length - 1).lastIndexOf(' ');
                const lastInstructions = this.myVar.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);

                if (lastInstructions.match(/.*#.*$/)) {
                    this.hashtagPresent = true;
                }
                if (this.hashtagPresent === false) {
                    if (match) {
                        this.duration = parseInt(lastInstructions.substring(0, lastInstructions.length - 1).substr(0, match.index), 10);
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + (this.duration + '#' + lastInstructions.substr(match.index) + ' ');
                        test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    }
                }
                if (this.hashtagPresent === true) {
                    if (match) {
                        this.duration = parseInt(lastInstructions.substring(0, lastInstructions.length - 1).substr(0, match.index), 10);
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + (this.duration + lastInstructions.substr(match.index) + ' ');
                        test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                        this.hashtagPresent = false;
                    }
                }
            }
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
        // const myArray = this.myVar.substring(0, this.myVar.length - 1).split(' ');
        // for ( let i = 0; i < myArray.length; i++){
        //     console.log(myArray[i]);
        //     const match = /[a-zA-Z]/.exec(myArray[i]);
        //     if (match) {
        //         const this.duration = parseInt(myArray[i].substr(0, match.index));
        //         // this.myVar = this.myVar.substr(0, myIndex) + ' ' + this.duration + lastInstructions.substr(match.index) + ' ';
        //         // playThis.triggerAttackRelease(myArray[i].substring(match.index, match.index + 1) + '#1', this.duration + 'n', tone.Time('4n') + tone.Time('8n'));
        //     }
        // }

        const part = new tone.Part(function(time, value){
            playThis.triggerAttackRelease(value.note, '8n', time, value.velocity);
        }, [{'time' : 0, 'note' : 'C3', 'velocity': 0.9},
            {'time' : '0:2', 'note' : 'C4', 'velocity': 0.5}
        ]).start(0);

    }
}
