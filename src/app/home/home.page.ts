import {Component, ViewChild} from '@angular/core';
import * as tone from 'tone';
// @ViewChild('play') play;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public buttons: Array<string>;
    public octave = 4;
    public myVar = '';
    public hashtagPresent = false;
    public duration = 4;
    public frontEndOctave = 1;
    public seq;
    constructor() {
        this.buttons = ['Eminem: Without Me', 'Guns N Roses: Paradise City', 'X-Files', 'Abba: Mamma Mia', 'Barbie girl'];
    }
    public songs = {
      paradiseCity : '8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1 8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1',
      withoutMe : '8d2 8#a2 8a2 8g2 4d2 4- 8d2 8c2 8d2 8f2 8d2 8- 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 4g1 4- 8- 8d2 8#a2 8a2 8g2 8d2 8- 4- 8d2 8c2 8d2 8f2 4d2 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 8g1',
      xfiles : '4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4#f2 2b1 1- 4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4e2 2b1',
      mammamia : '32f2 32#d2 32f2 8#d2 32#d2 32#d2 32f2 32g2 32f2 16.#d2 32- 16f2 8#d2 16#g2 32#g2 32#g2 32#g2 16g2 16.#d2 32- 8#a2 32#a2 32#a2 16#a2 16f2 16g2 8#g2 16g2 16g2 32g2 16g2 16d2 16#d2 8f2 16f2 8#d2 16#g2 32#g2 32#g2 32#g2 32g2 32#d2 32f2 16#d2',
      barbiegirl : '8#g2 8e2 8#g2 8#c3 4a2 4- 8#f2 8#d2 8#f2 8b2 4#g2 8#f2 8e2 4- 8e2 8#c2 4#f2 4#c2 4- 8#f2 8e2 4#g2 4#f2'
    };
    buttonClicked(num) {
        const test = new tone.Synth().toMaster();
        if (1 === num) {
            test.triggerAttackRelease('C' + this.octave, '4n');
            this.myVar = this.myVar + '4c' + this.frontEndOctave + ' ';
        }
        if (2 === num) {
            test.triggerAttackRelease('D' + this.octave, '4n');
            this.myVar = this.myVar + '4d' + this.frontEndOctave + ' ';
        }
        if (3 === num) {
            test.triggerAttackRelease('E' + this.octave, '4n');
            this.myVar = this.myVar + '4e' + this.frontEndOctave + ' ';
        }
        if (4 === num) {
            test.triggerAttackRelease('F' + this.octave, '4n');
            this.myVar = this.myVar + '4f' + this.frontEndOctave + ' ';
        }
        if (5 === num) {
            test.triggerAttackRelease('G' + this.octave, '4n');
            this.myVar = this.myVar + '4g' + this.frontEndOctave + ' ';
        }
        if (6 === num) {
            test.triggerAttackRelease('F'  + this.octave, '4n');
            this.myVar = this.myVar + '4a' + this.frontEndOctave + ' ';
        }
        if (7 === num) {
            test.triggerAttackRelease('B'  + this.octave, '4n');
            this.myVar = this.myVar + '4b' + this.frontEndOctave + ' ';
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
            this.frontEndOctave = this.frontEndOctave + 1;
            if (this.frontEndOctave > 3) {
                this.frontEndOctave = 1;
            }
            this.octave = this.octave + 1;
            if (this.octave > 6 ) {
                this.octave = 4;
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
        const synth = new tone.Synth().toMaster();
        const notesArray = this.myVar.split(' ');
        this.seq = new tone.Sequence(function(time, note) {
            let noteLength;
            let noteValue;
            const match = /[a-zA-Z]/.exec(note);
            const matchHashTag = /#/.exec(note);
            const matchPause = /-/.exec(note);
            let octaveValue;
            if (match) {
                octaveValue = parseInt(note.substring(match.index + 1), 10);
                if (octaveValue === 1) {
                    note = note.substring(0, match.index + 1) + 4;
                } else if (octaveValue === 2) {
                    note = note.substring(0, match.index + 1) + 5;
                } else if (octaveValue === 3) {
                    note = note.substring(0, match.index + 1) + 6;
                }
                noteLength = parseInt(note.substr(0, match.index), 10);
                noteValue = note.substr(match.index);
                if (matchHashTag) {
                    noteValue = noteValue.substring(0, 1) + '#' + noteValue.substring(1);
                }
                synth.triggerAttackRelease(noteValue, noteLength + 'n');
            }
            if (matchPause) {
                noteLength = parseInt(note.substr(0, matchPause.index), 10);
                synth.triggerAttackRelease('', noteLength + 'n');
            }
        }, notesArray);
        this.seq.start();
        this.seq.loop = 0;
        // tone.Transport.bpm.rampTo(125);
        tone.Transport.start('+0.1');
    }

    stop() {
        this.seq = this.seq.dispose();
        tone.Transport.stop();
    }

    guns(event, button) {
        // document.getElementById('stop').click();
        if (button.match(/Eminem/)) {
            this.myVar = this.songs.withoutMe;
        }
        if (button.match(/Guns/)) {
            this.myVar = this.songs.paradiseCity;
        }
        if (button.match(/X-Files/)) {
            this.myVar = this.songs.xfiles;
        }
        if (button.match(/Mamma/)) {
            this.myVar = this.songs.mammamia;
        }
        if(button.match(/Barbie/)) {
            this.myVar = this.songs.barbiegirl;
        }
        console.log(event);
        console.log(button);
        // this.myVar = '8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1 8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1';
        document.getElementById('play').click();
    }
}
