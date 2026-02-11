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

  noClickedOnce = false;
  noStyle: any = {};
  noTop = 0;
  noLeft = 0;

  playAudio(type: 'yes' | 'no') {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    const src =
      type === 'yes'
        ? 'assets/happy.mp3'
        : 'assets/cry-banana-cat.mp3';

    this.audio = new Audio(src);
    this.audio.loop = true;   
    this.audio.volume = 0.7;     
    this.audio.play();

    this.showResult = type;
  }

  onYes() {
    this.playAudio('yes');
  }

  onNo() {
    this.noClickedOnce = true; 
    this.playAudio('no');
  }

  // moveNoButton() {
  //   if (!this.noClickedOnce) return; 

  //   const box = document.querySelector('.box') as HTMLElement;
  //   if (!box) return;

  //   const boxWidth = box.clientWidth;
  //   const boxHeight = box.clientHeight;

  //   const buttonWidth = 90;
  //   const buttonHeight = 40;

  //   this.noLeft = Math.random() * (boxWidth - buttonWidth);
  //   this.noTop = Math.random() * (boxHeight - buttonHeight);
  // }

  moveNoButton(noBtn: HTMLElement, yesBtn: HTMLElement) {
    if (!this.noClickedOnce) return;

    const box = document.querySelector('.box') as HTMLElement;
    if (!box) return;

    // First time after phase 2 → move to Yes position
    if (!this.noStyle.position) {

      const yesRect = yesBtn.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      this.noStyle = {
        position: 'absolute',
        top: (yesRect.top - boxRect.top) + 'px',
        left: (yesRect.left - boxRect.left) + 'px'
      };

      return;
    }

    // After that → random escape
    const randomLeft = Math.random() * (box.clientWidth - noBtn.offsetWidth);
    const randomTop = Math.random() * (box.clientHeight - noBtn.offsetHeight);

    this.noStyle = {
      ...this.noStyle,
      top: randomTop + 'px',
      left: randomLeft + 'px'
    };
  }


  reset() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.showResult = null;
  }
}
