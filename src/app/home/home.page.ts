import { Component, ViewChild } from '@angular/core';
import * as tone from 'tone';
import { Options } from 'ng5-slider';
import { FormControl } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import {bufferToWav} from 'audiobuffer-to-wav';
import * as xhr from 'xhr';
// @ViewChild('play') play;


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    // public value = 100;
    // sliderControl: FormControl = new FormControl(100);
    public value = 150;
    options: Options = {
        floor: 0,
        ceil: 400
    };
    public effectName: any;
    public test123;
    public audioContext = new AudioContext();
    public bitcrusher;
    public duosynth;
    public distortion;
    public chorus;
    public buttons: Array<string>;
    public octave = 4;
    public inputBox = '';
    public hashtagPresent = false;
    public duration = 4;
    public frontEndOctave = 1;
    public seq;
    public songs;
    public counter = 1;
    constructor() {
        this.buttons = ['Eminem: Without Me', 'Guns N Roses: Paradise City', 'Aqua - Barbie girl', 'Michael Jackson: Beat it',
            'Match of The Day', 'X-Files', 'Michael Jackson: Smooth criminal', 'Mission Impossible',
            'Mr.President: Coco Jamboo', 'La Cucaracha', 'Simpsons Theme', 'Eye of the Tiger', 'Queen: We Are The Champions',];
        this.buttons = this.buttons.sort();
        this.songs = [
            {
                paradise: {
                    notes: '8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1 8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1',
                    tempo: 225
                }
            },
            {
                without: {
                    notes: '8d2 8#a2 8a2 8g2 4d2 4- 8d2 8c2 8d2 8f2 8d2 8- 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 4g1 4- 8- 8d2 8#a2 8a2 8g2 8d2 8- 4- 8d2 8c2 8d2 8f2 4d2 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 8g1',
                    tempo: 150
                }
            },
            {
                files: {
                    notes: '4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4#f2 2b1 1- 4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4e2 2b1',
                    tempo: 125
                }
            },
            {
                barbie: {
                    notes: '8#g2 8e2 8#g2 8#c3 4a2 4- 8#f2 8#d2 8#f2 8b2 4#g2 8#f2 8e2 4- 8e2 8#c2 4#f2 4#c2 4- 8#f2 8e2 4#g2 4#f2',
                    tempo: 190
                }
            },
            {
                beat: {
                    notes: '8e1 4g1 4b1 4g2 4e2 4- 4e2 8#f2 4e2 4d2 4- 8d2 4- 8e1 4g1 4b1 4g2 4e2 4- 4e2 8#f2 4e2 4d2',
                    tempo: 225
                }
            },
            {
                match: {
                    notes: '8c1 8f1 8a1 8.c2 16a1 8a1 8a1 8a1 4a1 8#a1 8.c2 16a1 8g1 8a1 8#a1 8c1 8e1 8g1 8.#a1 16g1 8g1 8g1 8g1 4g1 8a1 8.#a1 16g1 8f1 8g1 8a1 8c1 8f1 8a1 8.c2 16a1 8a1 8a1 8a1 4a1 8#a1 8.c2 16a1 8#a1 8c2 4d2 8d2 8e2 8f2 16f2 8e2 16e2 8d2 8f2 8c2 8c2 8d2 8c2 16#a1 8a1 16a1 8g1 4f1',
                    tempo: 130
                }
            },
            {
                smooth: {
                    notes: ' 8a1 16a1 16a1 16g1 16a1 8b1 8b1 8- 16a1 16b1 8c2 8c2 8- 16b1 16c2 8b1 4g1 8a1 8- 8a1 16a1 16a1 16g1 16a1 8b1 8b1 8- 16a1 16b1 8c2 8c2 8- 16b1 16c2 8b1 4g1',
                    tempo: 125
                }
            },
            {
                mission: {
                    notes: '16g2 8- 16g2 8- 16f2 16- 16#f2 16- 16g2 8- 16g2 8- 16#a2 16- 16c3 16- 16g2 8- 16g2 8- 16f2 16- 16#f2 16- 16g2 8- 16g2 8- 16#a2 16- 16c3 16- 16#a2 16g2 2d2 32- 16#a2 16g2 2#c2 32- 16#a2 16g2 2c2 16- 16#a1 16c2',
                    tempo: 250
                }
            },
            {
                jamboo: {
                    notes: '8g1 8c2 8g2 4g1 8c2 8g2 4#d2 8d2 8c2 8#g1 8c2 8#d2 4#g1 8#a1 8f2 4#d2 8d2 8c2 8g1 8c2 8g2 4g1 8c2 8g2 4#d2 8d2 8c2 8c2 8d2 8#d2 4c2 8f2',
                    tempo: 225
                }
            },
            {
                adams: {
                    notes: '8#f1 16#f1 16#f1 16#f1 8b1 32#d2 8b1 32#g1 8e1 8#c2 32a1 8#a1 32#c2 8#a1 32#f1 8#d1 8b1 32#f1 8b1 32#d2 8b1 32#g1 8e1 8#c2 32b1 8#a1 32#f1 8#g1 32#a1 4b1 32#f1 8b1 32#d2 8b1 32#g1 8e1 8#c2 32a1 8#a1 32#c2 8#a1 32#f1 8#d1 8b1 32#f1 8b1 32#d2 8b1 32#g1 8e1',
                    tempo: 70
                }
            },
            {
                cucaracha: {
                    notes: '4c1 4c1 4c1 8f1 8a1 4- 4c1 4c1 4c1 8f1 8a1 4- 4f1 4f1 4e1 4e1 4d1 4d1 8c1 4- 4- 4c1 4c1 4c1 8e1 8g1 4- 4c1 4c1 4c1 8e1 8g1 4- 4c2 4d2 4c2 4#a1 4a1 4g1 8f1',
                    tempo: 225
                }
            },
            {
                simpsons: {
                    notes: '4c2 4e2 4#f2 8a2 4.g2 4e2 4c2 8a1 8#f1 8#f1 8#f1 2g1 4- 8#f1 8#f1 8#f1 8g1 4#a1 8c2 8c2 8c2 4c2',
                    tempo: 190
                }
            },
            {
                tiger: {
                    notes: '8d1 8e1 8f1 8- 8f1 16f1 8f1 16- 8e1 8d1 8c1 8c1 8d1 8e1 8d1 8- 8d1 8e1 8f1 16- 32- 8e1 8f1 8g1 16- 32- 8f1 16- 32a1 8- 16- 2a1 4- 8d1 16c1 8d1 16- 8c1',
                    tempo: 200
                }
            },
            {
                champions: {
                    notes: '2d2 8#c2 8d2 4#c2 4a1 8#f1 4b1 2#f1 8a1 2d2 8e2 8#f2 4a2 4#f2 16b1 2b1 4b1 4a1 8b1 4a1 4g1 4g2 4#f2 8g2 4#f2 4e2 4#f2 4d2 8g2 4#f2 4d2 8g2 4f2 4d2 8g2 4f2 2d2 8c2 8a1 ',
                    tempo: 100
                }
            }

        ]
        // this.songs = [
        //     paradise: {
        //         notes: '8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1 8d1 4c1 4#c1 8d1 4c1 4#c1 4d1 4c1 4d1 4c1 4d1 8f1',
        //         tempo: 225
        //     },
        //     without: {
        //         notes: '8d2 8#a2 8a2 8g2 4d2 4- 8d2 8c2 8d2 8f2 8d2 8- 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 4g1 4- 8- 8d2 8#a2 8a2 8g2 8d2 8- 4- 8d2 8c2 8d2 8f2 4d2 4- 8d2 8c2 8d2 8c2 8#a1 8- 4- 8#a1 8a1 8f1 8g1',
        //         tempo: 150
        //     },
        //     files: {
        //         notes: '4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4e2 2b1 1- 4g2 4#f2 4e2 4d2 4#f2 2b1 1- 4e1 4b1 4a1 4b1 4d2 2b1 1- 4e1 4b1 4a1 4b1 4e2 2b1 1- 4e2 2b1',
        //         tempo: 125
        //     },
        //     barbie: {
        //         notes: '8#g2 8e2 8#g2 8#c3 4a2 4- 8#f2 8#d2 8#f2 8b2 4#g2 8#f2 8e2 4- 8e2 8#c2 4#f2 4#c2 4- 8#f2 8e2 4#g2 4#f2',
        //         tempo: 190
        //     },

        //     beat: {
        //         notes: '8e1 4g1 4b1 4g2 4e2 4- 4e2 8#f2 4e2 4d2 4- 8d2 4- 8e1 4g1 4b1 4g2 4e2 4- 4e2 8#f2 4e2 4d2',
        //         tempo: 225
        //     },
        //     match: {
        //         notes: '8c1 8f1 8a1 8.c2 16a1 8a1 8a1 8a1 4a1 8#a1 8.c2 16a1 8g1 8a1 8#a1 8c1 8e1 8g1 8.#a1 16g1 8g1 8g1 8g1 4g1 8a1 8.#a1 16g1 8f1 8g1 8a1 8c1 8f1 8a1 8.c2 16a1 8a1 8a1 8a1 4a1 8#a1 8.c2 16a1 8#a1 8c2 4d2 8d2 8e2 8f2 16f2 8e2 16e2 8d2 8f2 8c2 8c2 8d2 8c2 16#a1 8a1 16a1 8g1 4f1',
        //         tempo: 130
        //     },
        //     smooth: {
        //         notes: ' 8a1 16a1 16a1 16g1 16a1 8b1 8b1 8- 16a1 16b1 8c2 8c2 8- 16b1 16c2 8b1 4g1 8a1 8- 8a1 16a1 16a1 16g1 16a1 8b1 8b1 8- 16a1 16b1 8c2 8c2 8- 16b1 16c2 8b1 4g1',
        //         tempo: 125
        //     },
        //     mission: {
        //         notes: '16g2 8- 16g2 8- 16f2 16- 16#f2 16- 16g2 8- 16g2 8- 16#a2 16- 16c3 16- 16g2 8- 16g2 8- 16f2 16- 16#f2 16- 16g2 8- 16g2 8- 16#a2 16- 16c3 16- 16#a2 16g2 2d2 32- 16#a2 16g2 2#c2 32- 16#a2 16g2 2c2 16- 16#a1 16c2',
        //         tempo: 250
        //     },
        //     jamboo: {
        //         notes: '8g1 8c2 8g2 4g1 8c2 8g2 4#d2 8d2 8c2 8#g1 8c2 8#d2 4#g1 8#a1 8f2 4#d2 8d2 8c2 8g1 8c2 8g2 4g1 8c2 8g2 4#d2 8d2 8c2 8c2 8d2 8#d2 4c2 8f2',
        //         tempo: 225
        //     },
        //     adams: {
        //         notes: '8#f1 16#f1 16#f1 16#f1 8b1 32#d2 8b1 32#g1 8e1 8#c2 32a1 8#a1 32#c2 8#a1 32#f1 8#d1 8b1 32#f1 8b1 32#d2 8b1 32#g1 8e1 8#c2 32b1 8#a1 32#f1 8#g1 32#a1 4b1 32#f1 8b1 32#d2 8b1 32#g1 8e1 8#c2 32a1 8#a1 32#c2 8#a1 32#f1 8#d1 8b1 32#f1 8b1 32#d2 8b1 32#g1 8e1',
        //         tempo: 70
        //     },
        //     cucaracha: {
        //         notes: '4c1 4c1 4c1 8f1 8a1 4- 4c1 4c1 4c1 8f1 8a1 4- 4f1 4f1 4e1 4e1 4d1 4d1 8c1 4- 4- 4c1 4c1 4c1 8e1 8g1 4- 4c1 4c1 4c1 8e1 8g1 4- 4c2 4d2 4c2 4#a1 4a1 4g1 8f1',
        //         tempo: 225
        //     },
        //     simpsons: {
        //         notes: '4c2 4e2 4#f2 8a2 4.g2 4e2 4c2 8a1 8#f1 8#f1 8#f1 2g1 4- 8#f1 8#f1 8#f1 8g1 4#a1 8c2 8c2 8c2 4c2',
        //         tempo: 190
        //     },
        //     tiger: {
        //         notes: '8d1 8e1 8f1 8- 8f1 16f1 8f1 16- 8e1 8d1 8c1 8c1 8d1 8e1 8d1 8- 8d1 8e1 8f1 16- 32- 8e1 8f1 8g1 16- 32- 8f1 16- 32a1 8- 16- 2a1 4- 8d1 16c1 8d1 16- 8c1',
        //         tempo: 200
        //     },
        //     champions: {
        //         notes: '2d2 8#c2 8d2 4#c2 4a1 8#f1 4b1 2#f1 8a1 2d2 8e2 8#f2 4a2 4#f2 16b1 2b1 4b1 4a1 8b1 4a1 4g1 4g2 4#f2 8g2 4#f2 4e2 4#f2 4d2 8g2 4#f2 4d2 8g2 4f2 4d2 8g2 4f2 2d2 8c2 8a1 ',
        //         tempo: 100
        //     }
        // ]
        // };
    }






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
            buttonsSynth.triggerAttackRelease('F' + this.octave, '4n');
            this.inputBox = this.inputBox + '4a' + this.frontEndOctave + ' ';
        }
        if (7 === num) {
            buttonsSynth.triggerAttackRelease('B' + this.octave, '4n');
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
            if (this.octave > 6) {
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
    save() {
        if (this.inputBox.length > 2) {   
            this.buttons.push("song" + this.counter);
            const objTest = {};
            objTest["song" + this.counter] = {
                notes: this.inputBox,
                    tempo: this.value
            }
            this.songs.push(objTest);
            this.counter++;
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
        let counter = 0;
        document.getElementById('stop').click();
        let synth;
        if (this.effectName === 'chorus') {
            const chorus = new tone.Chorus(4, 2.5, 0.5);
            synth = new tone.PolySynth(4, tone.MonoSynth).connect(chorus).toMaster();
        }
        else if (this.effectName === 'distortion') {
            const phaser = new tone.Phaser({
                "frequency": 15,
                "octaves": 5,
                "baseFrequency": 1000
            }).toMaster();
            synth = new tone.FMSynth().connect(phaser);

        }
        else if (this.effectName === 'duosynth') {
            const reverb = new tone.JCReverb(0.4).connect(tone.Master);
            const delay = new tone.FeedbackDelay(0.5);
            //connecting the synth to reverb through delay
            synth = new tone.DuoSynth().chain(delay, reverb);
        }
        else if (this.effectName === 'bitcrusher') {
            const crusher = new tone.BitCrusher(4).toMaster();
            synth = new tone.MonoSynth().connect(crusher);
        }
        else {
            synth = new tone.Synth({
                oscillator: {
                    type: 'triangle',
                    detune: 1,
                    phase: 3
                },
                // frequency: 100,
                envelope: {
                    attackCurve: 'linear',
                    releaseCurve: 'step'
                }
                // harmonicity: 1.0,
                // modulationIndex: 10
            }).toMaster();
        }
        const notesArray = this.inputBox.split(' ');
        this.seq = new tone.Sequence(function (time, note) {
            let noteLength;
            let noteValue;
            const match = /[a-zA-Z]/.exec(note);
            const matchHashTag = /#/.exec(note);
            const matchPause = /-/.exec(note);
            let octaveValue;
            if (match) {
                counter = counter + 1;
                // console.log(notesArray[notesArray.length-1]);
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
            }
        }, notesArray);

        // var loop = new tone.Loop(function (time) {
        //     //triggered every eighth note. 
        //     console.log(time);
        // }, notesArray).start(0);
        this.seq.start();
        this.seq.loop = 0;
        tone.Transport.bpm.rampTo(this.value);
        tone.Transport.start();
    }

    stop() {
        if (this.seq) {
            this.seq = this.seq.dispose();
        }
        tone.Transport.stop();
    }



    songsList(event, button) {
        // console.log(button + "button name");
        document.getElementById('stop').click();
        this.inputBox = '';

        for (var i = 0; i < this.songs.length; i++) {
            // console.log(
            //     Object.keys(this.songs[i])[0]
            //     );

            if(button.toLowerCase().includes(Object.keys(this.songs[i])[0]))
            {
                console.log(Object.keys(this.songs[i])[0]);


                //add here object name
                
                // this.songs[i][Object.keys(this.songs[i])[0]].notes=this.inputBox;
                // this.songs[i][Object.keys(this.songs[i])[0]].tempo=this.value;

                const notes=this.songs[i][Object.keys(this.songs[i])[0]].notes;
                const tempo=this.songs[i][Object.keys(this.songs[i])[0]].tempo;
                
                console.log(notes);
                console.log(tempo);
                
                this.inputBox = notes;
                this.value = tempo;
                tone.Transport.bpm.rampTo(this.value);
                
                document.getElementById('play').click();
                // const str=Object.keys(this.songs[i])[0];
                // const name=Object.keys(this.songs[i][0]);
                // console.log(this.songs[i][0]);
             

            }
        }
        
        // for(const val of Object.keys(this.songs)){
        //     console.log(this.songs[val]);
        //     if (button.toLowerCase().includes(this.songs[val])) {
        //         console.log(this.songs[val] + "found");
        //     // tone.Transport.bpm.rampTo(this.songs[val].tempo);
        //     // this.inputBox = this.songs[val].notes;
        //     // this.value = this.songs[val].tempo + 50;
        //     }
        // for (const value of Object.keys(this.songs)) {
        //     console.log(value);
        //     if (button.toLowerCase().includes(value)) {
        //         tone.Transport.bpm.rampTo(this.songs[value].tempo);
        //         this.inputBox = this.songs[value].notes;
        //         this.value = this.songs[value].tempo + 50;
        //     }
        // }
    }
}