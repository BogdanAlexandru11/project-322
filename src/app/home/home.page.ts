import {Component, ViewChild, Directive} from '@angular/core';
import * as tone from 'tone';
import { Options } from 'ng5-slider';
// import { IonicPage, NavController } from 'ionic-angular/index';
import { FormControl } from '@angular/forms';



// @ViewChild('play') play;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
    // public value = 100;
    // sliderControl: FormControl = new FormControl(100);
    public value = 100;
    options: Options = {
        floor: 0,
        ceil: 300
    };


    public buttons: Array<string>;
    public octave = 4;
    public inputBox = '';
    public hashtagPresent = false;
    public duration = 4;
    public frontEndOctave = 1;
    public seq;
    constructor() {
        this.buttons = ['Eminem: Without Me', 'Guns N Roses: Paradise City', 'X-Files', 'Abba: Mamma Mia', 'Barbie girl', 'Michael Jackson: Beat it', 'Aerosmith: I Don\'t Wanna Miss A Thing', 'Beatles: Happy Together', 'Metallica: Harvester of Sorrow', 'Pulp Fiction'];
    }

    public songs = {
        paradise : {
            notes: '8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1 8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1',
            tempo: 225
        },
        without : {
            notes : '8d2 8#a2 8a2 8g2 4d2 4- 8d2 8c2 8d2 8f2 8d2 8- 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 4g1 4- 8- 8d2 8#a2 8a2 8g2 8d2 8- 4- 8d2 8c2 8d2 8f2 4d2 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 8g1',
            tempo : 112
      },
      files : {
          notes : '4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4#f2 2b1 1- 4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4e2 2b1',
          tempo : 125
      },
      mamma : {
            notes : '32f2 32#d2 32f2 8#d2 32#d2 32#d2 32f2 32g2 32f2 16.#d2 32- 16f2 8#d2 16#g2 32#g2 32#g2 32#g2 16g2 16.#d2 32- 8#a2 32#a2 32#a2 16#a2 16f2 16g2 8#g2 16g2 16g2 32g2 16g2 16d2 16#d2 8f2 16f2 8#d2 16#g2 32#g2 32#g2 32#g2 32g2 32#d2 32f2 16#d2',
          tempo : 125
      },
      barbie : {
            notes : '8#g2 8e2 8#g2 8#c3 4a2 4- 8#f2 8#d2 8#f2 8b2 4#g2 8#f2 8e2 4- 8e2 8#c2 4#f2 4#c2 4- 8#f2 8e2 4#g2 4#f2',
            tempo : 125
      },

        beat : {
            notes : '8e1 4g1 4b1 4g2 4e2 4- 4e2 8#f2 4e2 4d2 4- 8d2 4- 8e1 4g1 4b1 4g2 4e2 4- 4e2 8#f2 4e2 4d2',
            tempo : 225
        },
        aerosmith : {
            notes : '2- 16a1 16- 16a1 16- 8a1 16- 4a2 16g2 16- 2g2 16- 4- 8- 16g2 16- 16g2 16- 16g2 8g2 16- 4c2 16#a1 16- 4a2 8g2 4f2 4g2 8d2 8f2 16- 16f2 16- 16c2 8c2 16- 4a2 8g2 16f2 16- 8f2 16- 16c2 16- 4g2 4f2',
            tempo : 125
        },
        happy : {
            notes : '16c2 4c2 16d2 4#d2 16d2 2#d2 16d2 2#d2 4g2 4f2 16#d2 4d2 16c2 4d2 16c2 2d2 16c2 4#a1 16c2 2d2 16f2 4#d2 16d2 4c2 16#a1 4c2 16#a1 2c2 16#a1 4#g1 16#a1 4c2 4c2 16c2 4c2 16d2 8d2 8c2 4b1 1g2 4c2 4g2 4e2 4c2 4#a1 16d2 4f2 4a2 16#a2 4a2',
            tempo : 125
        },
        harvester : {
            notes : '16g1 16#f1 16e1 16b1 16#a1 16#g1 16g1 16f1 4e1 4- 8e1 8b1 8f2 8e2 16e1 16b1 8g2 8f2 8e2 8e1 8b1 8f2 8d2 16g1 16a1 8d2 8f1 8d2',
            tempo : 150
        },
        fiction : {
            notes : '16f1 16f1 16f1 16f1 16f1 16f1 16f1 16f1 16a1 16a1 16a1 16a1 16#a1 16#a1 16#a1 16#a1 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16f1 16e2 16e2 16e2 16e2 16#c2 16#c2 16#c2 16#c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2 16c2',
            tempo : 113
}

    };


    buttonClicked(num) {
        const buttonsSynth = new tone.Synth({
            frequency: 100,
            envelope: {
                attack: 0.1,
                decay: 0.1,
                release: 0.01
            },
            harmonicity: 1.0,
            modulationIndex: 10,
            volume: -10
        }).toMaster();
        if (1 === num) {
            buttonsSynth.triggerAttackRelease('C' + this.octave, '4n');
            this.inputBox = this.inputBox + '4c' + this.frontEndOctave + ' ';
        }
        if (2 === num) {
            buttonsSynth.triggerAttackRelease('D' + this.octave, '4n');
            this.inputBox = this.inputBox + '4d' + this.frontEndOctave + ' ';
        }
        if (3 === num) {
            buttonsSynth.triggerAttackRelease('E' + this.octave, '4n');
            this.inputBox = this.inputBox + '4e' + this.frontEndOctave + ' ';
        }
        if (4 === num) {
            buttonsSynth.triggerAttackRelease('F' + this.octave, '4n');
            this.inputBox = this.inputBox + '4f' + this.frontEndOctave + ' ';
        }
        if (5 === num) {
            buttonsSynth.triggerAttackRelease('G' + this.octave, '4n');
            this.inputBox = this.inputBox + '4g' + this.frontEndOctave + ' ';
        }
        if (6 === num) {
            buttonsSynth.triggerAttackRelease('F'  + this.octave, '4n');
            this.inputBox = this.inputBox + '4a' + this.frontEndOctave + ' ';
        }
        if (7 === num) {
            buttonsSynth.triggerAttackRelease('B'  + this.octave, '4n');
            this.inputBox = this.inputBox + '4b' + this.frontEndOctave + ' ';
        }
        if (8 === num) {
            const myIndex = this.inputBox.substr(0, this.inputBox.length - 1).lastIndexOf(' ');
            if (this.inputBox.length <= 5) {
                const myString = this.inputBox.substr(0, this.inputBox.length - 1);
                const match = /[a-zA-Z]/.exec(myString);
                if (match) {
                    this.duration = parseInt(myString.substr(0, match.index), 10);
                    this.duration = this.duration * 2;
                    if (this.duration > 32) {
                       this.duration = 32;
                    }
                    if (myString.match(/#/)) {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + '#' + myString.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + myString.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
            } else {
                const lastInstructions = this.inputBox.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                const matchPause = /[-]/.exec(lastInstructions);
                if (match) {
                    this.duration = parseInt(lastInstructions.substr(0, match.index), 10);
                    this.duration = this.duration * 2;
                    if (this.duration > 32) {
                        this.duration = 32;
                    }
                    if (lastInstructions.match(/#/)) {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + '#' + lastInstructions.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + lastInstructions.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
                if (matchPause) {
                    this.duration = parseInt(lastInstructions.substr(0, matchPause.index), 10);
                    this.duration = this.duration * 2;
                    if (this.duration > 32) {
                        this.duration = 32;
                    }
                    this.inputBox = this.inputBox.substring(0, myIndex) + ' ' + this.duration + '- ';
                }
            }
        }
        if (9 === num) {
            const myIndex = this.inputBox.substr(0, this.inputBox.length - 1).lastIndexOf(' ');
            if (this.inputBox.length <= 6) {
                const myString = this.inputBox.substr(0, this.inputBox.length - 1);
                const match = /[a-zA-Z]/.exec(myString);
                if (match) {
                    this.duration = parseInt(myString.substr(0, match.index), 10);
                    this.duration = this.duration / 2;
                    if (this.duration < 2) {
                        this.duration = 1;
                    }
                    if (myString.match(/#/)) {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + '#' + myString.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + myString.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
            } else {
                const lastInstructions = this.inputBox.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);
                const matchPause = /[-]/.exec(lastInstructions);
                if (match) {
                    this.duration = parseInt(lastInstructions.substr(0, match.index), 10);
                    this.duration = this.duration / 2;
                    if (this.duration < 2) {
                        this.duration = 1;
                    }
                    if (lastInstructions.match(/#/)) {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + '#' + lastInstructions.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    } else {
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + this.duration + lastInstructions.substr(match.index) + ' ';
                        buttonsSynth.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                    }
                }
                if (matchPause) {
                    this.duration = parseInt(lastInstructions.substr(0, matchPause.index), 10);
                    this.duration = this.duration / 2;
                    if (this.duration < 2) {
                        this.duration = 1;
                    }
                    this.inputBox = this.inputBox.substring(0, myIndex) + ' ' + this.duration + '- ';
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
            this.inputBox = this.inputBox + '4- ';
        }

        if (12 === num) {
            if (this.inputBox.length <= 6) {
                    if (this.inputBox.match(/.*#.*$/)) {
                        this.hashtagPresent = true;
                    }
                    if (this.hashtagPresent === false) {
                        const myString = this.inputBox.substr(0, this.inputBox.length - 1);
                        const match = /[a-zA-Z]/.exec(myString);
                        if (match) {
                            this.duration = parseInt(this.inputBox.substr(0, this.inputBox.length - 1).substr(0, match.index), 10);
                            this.inputBox = this.inputBox.substr(0, match.index) + '#' + this.inputBox.substring(match.index);
                            buttonsSynth.triggerAttackRelease(myString.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                        }
                    } else {
                        const myString = this.inputBox.substr(0, this.inputBox.length - 1);
                        const match = /[a-zA-Z]/.exec(myString);
                        const matchHashtag = /#/.exec(myString);
                        if (match) {
                            if (matchHashtag) {
                                this.duration = parseInt(this.inputBox.substr(0, this.inputBox.length - 1).substr(0, match.index), 10);
                                this.inputBox = this.duration + myString.substring(0, matchHashtag.index - 1) + myString.substring(matchHashtag.index + 1) + ' ';
                                buttonsSynth.triggerAttackRelease(myString.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                                this.hashtagPresent = false;
                            }
                        }
                    }
                } else {
                const myIndex = this.inputBox.substr(0, this.inputBox.length - 1).lastIndexOf(' ');
                const lastInstructions = this.inputBox.substr(myIndex).trim();
                const match = /[a-zA-Z]/.exec(lastInstructions);

                if (lastInstructions.match(/.*#.*$/)) {
                    this.hashtagPresent = true;
                }
                if (this.hashtagPresent === false) {
                    if (match) {
                        this.duration = parseInt(lastInstructions.substring(0, lastInstructions.length - 1).substr(0, match.index), 10);
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + (this.duration + '#' + lastInstructions.substr(match.index) + ' ');
                        buttonsSynth.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + '#' + this.octave, this.duration + 'n');
                    }
                }
                if (this.hashtagPresent === true) {
                    if (match) {
                        this.duration = parseInt(lastInstructions.substring(0, lastInstructions.length - 1).substr(0, match.index), 10);
                        this.inputBox = this.inputBox.substr(0, myIndex) + ' ' + (this.duration + lastInstructions.substr(match.index) + ' ');
                        buttonsSynth.triggerAttackRelease(lastInstructions.substring(match.index, match.index + 1) + this.octave, this.duration + 'n');
                        this.hashtagPresent = false;
                    }
                }
            }
        }
    }

    reset() {
        this.inputBox = '';
    }

    deleteLast() {
        const myIndex = this.inputBox.substr(0, this.inputBox.length - 1).lastIndexOf(' ');
        if (this.inputBox.length <= 6) {
            this.inputBox = '';
        } else {
                this.inputBox = this.inputBox.substr(0, myIndex) + ' ';
            }
        }

    play() {
        // const synth = new tone.Synth().toMaster();
        document.getElementById('stop').click();

        const synth = new tone.Synth({
            frequency:  200,
            envelope: {
                attack: 0.01,
                decay: 0.1,
                release: 0.01
            },
            harmonicity: 1.0,
            modulationIndex: 10,
            volume: -10
        }).toMaster();

        const notesArray = this.inputBox.split(' ');
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
                // synth.volume.value = 0;
                // synth.Zero ( );
                // synth.triggerRelease('', noteLength + 'n');
            }
        }, notesArray);
        this.seq.start();
        this.seq.loop = 0;
        tone.Transport.bpm.rampTo(this.value);
        tone.Transport.start('+0.1');
    }

    stop() {
        this.seq = this.seq.dispose();
        tone.Transport.stop();
    }



    songsList(event, button) {
        document.getElementById('stop').click();
        this.inputBox = '';
            for (const value of Object.keys(this.songs)) {
                    if (button.toLowerCase().includes(value)) {
                        tone.Transport.bpm.rampTo(this.songs[value].tempo);
                        this.inputBox = this.songs[value].notes;
                        this.value = this.songs[value].tempo;
                    }
            }
        document.getElementById('play').click();
    }
}

