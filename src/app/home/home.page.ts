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
                    let duration = parseInt(myString.substr(0, match.index), 10);
                    duration = duration * 2;
                    if (duration > 32) {
                       duration = 32;
                    }
                    console.log(myString);
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + myString.substr(match.index) + ' ';
                    test.triggerAttackRelease(myString.substring(match.index, match.index + 1)  + this.octave, duration + 'n');
                }
                console.log(this.myVar.substr(0, this.myVar.length - 1));
            } else {
                const lastInstructions = this.myVar.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                const matchPause = /[-]/.exec(lastInstructions);
                if (match) {
                    let duration = parseInt(lastInstructions.substr(0, match.index), 10);
                    duration = duration * 2;
                    if (duration > 32) {
                        duration = 32;
                    }
                    console.log(lastInstructions);
                    console.log('*********');
                    console.log(duration + '#' + lastInstructions.substr(match.index) + ' ');
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + lastInstructions.substr(match.index) + ' ';
                    test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, duration + 'n');
                }
                if (matchPause) {
                    let duration = parseInt(lastInstructions.substr(0, matchPause.index), 10);
                    duration = duration * 2;
                    if (duration > 32) {
                        duration = 32;
                    }
                    this.myVar = this.myVar.substring(0, myIndex) + ' ' + duration + '- ';
                }
            }
        }
        if (9 === num) {
            const myIndex = this.myVar.substr(0, this.myVar.length - 1).lastIndexOf(' ');
            if (this.myVar.length <= 6) {
                const myString = this.myVar.substr(0, this.myVar.length - 1);
                const match = /[a-zA-Z]/.exec(myString);
                if (match) {
                    let duration = parseInt(myString.substr(0, match.index), 10);
                    console.log(duration);
                    duration = duration / 2;
                    if (duration < 2) {
                        duration = 1;
                    }
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + myString.substr(match.index) + ' ';
                    test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, duration + 'n');
                }
                console.log(this.myVar.substr(0, this.myVar.length - 1));
            } else {
                const lastInstructions = this.myVar.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                const matchPause = /[-]/.exec(lastInstructions);
                if (match) {
                    let duration = parseInt(lastInstructions.substr(0, match.index), 10);
                    duration = duration / 2;
                    if (duration < 2) {
                        duration = 1;
                    }
                    this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + lastInstructions.substr(match.index) + ' ';
                    console.log(lastInstructions.substring(match.index, match.index + 1));
                    test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, duration + 'n');
                }
                if (matchPause) {
                    let duration = parseInt(lastInstructions.substr(0, matchPause.index), 10);
                    duration = duration / 2;
                    if (duration < 2) {
                        duration = 1;
                    }
                    this.myVar = this.myVar.substring(0, myIndex) + ' ' + duration + '- ';
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
            console.log('rest function');
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
                            const duration = parseInt(this.myVar.substr(0, this.myVar.length - 1).substr(0, match.index), 10);
                            this.myVar = this.myVar.substr(0, match.index) + '#' + this.myVar.substring(match.index);
                            test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, duration + 'n');
                        }
                    } else {
                        const myString = this.myVar.substr(0, this.myVar.length - 1);
                        const match = /[a-zA-Z]/.exec(myString);
                        const matchHashtag = /#/.exec(myString);
                        if (match) {
                            if (matchHashtag) {
                                console.log(myString);
                                const duration = parseInt(this.myVar.substr(0, this.myVar.length - 1).substr(0, match.index), 10);
                                this.myVar = duration + myString.substring(0, matchHashtag.index - 1) + myString.substring(matchHashtag.index + 1) + ' ';
                                test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, duration + 'n');
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
                    const myString = this.myVar.substr(0, this.myVar.length - 1);
                    // add here the hashtag
                    console.log(lastInstructions);
                    if (match) {
                        // add the hashtag
                        this.duration = parseInt(this.myVar.substr(0, this.myVar.length - 1).substr(0, match.index), 10);
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + (this.duration + '#' + lastInstructions.substr(match.index) + ' ');
                        test.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    }
                }
                if (this.hashtagPresent === true){
                    if (match) {
                        // add the hashtag
                        this.duration = parseInt(this.myVar.substr(0, this.myVar.length - 1).substr(0, match.index), 10);
                        this.myVar = this.myVar.substr(0, myIndex) + ' ' + (this.duration + lastInstructions.substr(match.index) + ' ');
                        test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                        this.hashtagPresent = false;
                    }
                }
                // const lastInstructions = this.myVar.substr(myIndex).trim();
                // const match = /[a-zA-Z]/.exec(lastInstructions);
                // const matchPause = /[-]/.exec(lastInstructions);
                // if (match) {
                //     let duration = parseInt(lastInstructions.substr(0, match.index), 10);
                //     duration = duration / 2;
                //     if (duration < 2) {
                //         duration = 1;
                //     }
                //     this.myVar = this.myVar.substr(0, myIndex) + ' ' + duration + lastInstructions.substr(match.index) + ' ';
                //     console.log(lastInstructions.substring(match.index, match.index + 1));
                //     test.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, duration + 'n');
                // }
                //

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



