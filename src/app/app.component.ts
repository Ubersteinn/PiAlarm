import { Component } from '@angular/core';
import { AlarmService } from 'src/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'PiAlarm';

  constructor(public alarmService: AlarmService) {}

  public toggleAlarm() {
    if (this.alarmService.playing) {
      this.alarmService.pause();
    } else {
      this.alarmService.play();
    }
  }
}
