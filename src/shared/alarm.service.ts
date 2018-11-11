import { Subject, Observer } from 'rxjs';
import { AlarmSocket } from './alarmsocket';

export class AlarmService {

    private alarm: AlarmSocket;

    constructor() {
        this.alarm = new AlarmSocket();
    }

    public async toggleAlarm() {
        await this.alarm.send();
    }
}
