import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html',
  imports: [CommonModule],
  styleUrls: ['app.css']
})

export class AppComponent {

  showResult: 'yes' | 'no' | null = null;
  audio: HTMLAudioElement | null = null;

  playAudio(type: 'yes' | 'no') {
    // stop previous audio if any
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    const src =
      type === 'yes'
        ? 'assets/happy.mp3'
        : 'assets/cry-banana-cat.mp3';

    this.audio = new Audio(src);
    this.audio.loop = true;       // 🔁 background loop
    this.audio.volume = 0.7;      // 🔉 not too loud
    this.audio.play();

    this.showResult = type;
  }

  onYes() {
    this.playAudio('yes');
  }

  onNo() {
    this.playAudio('no');
  }

  reset() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.showResult = null;
  }
}
