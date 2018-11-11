import { Subject, Observer } from 'rxjs';
import { AlarmSocket } from './alarmsocket';

export class AlarmService {

    private url = 'ws://bedpi02.local:4200';
    private alarm: AlarmSocket;
    private _playing: boolean;

    public get playing(): boolean {
        return this._playing;
    }

    constructor() {
        this.alarm = new AlarmSocket(this.url);
        this._playing = false;
    }

    public async play() {
        const response = await this.alarm.send('play');
        this._playing = response === 'playing';
    }

    public async pause() {
        const response = await this.alarm.send('pause');
        this._playing = response === 'playing';
    }
}
