import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { fadeInDown } from 'ng-animate';
import { Teximate, TextAnimation } from 'ngx-teximate';
import { timer } from 'rxjs';

@Component({
  selector: 'app-square-number',
  templateUrl: './square-number.component.html',
  styleUrls: ['./square-number.component.css']
})
export class SquareNumberComponent implements OnInit, OnDestroy {
  @ViewChild(Teximate) teximate: Teximate;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event) {
    if (event.code.toLowerCase() === 'space' && event.srcElement.localName==='body' && this.startGame) {
       this.pauseTheTimer()
    }
  }

  enterAnimation: TextAnimation = {
    animation: fadeInDown,
    delay: 50,
    type: 'letter'
  };
  randomNumber: number | string = '2';
  currentTime;
  timeInterval;
  constructor() { 
  
      this.timeInterval=setInterval(() => {
        this.currentTime = new Date().toString().split(' ')[4];
        this.currentTime=this.transform(this.currentTime);
     }, 1000);
     if(localStorage.getItem('totalCount')){
       this.totalCount=+localStorage.getItem('totalCount');
     }
     if(localStorage.getItem('correctCount')){
      this.correctCount=+localStorage.getItem('correctCount');
    }
  }

  setting = new FormGroup({
    startRange: new FormControl(1),
    endRange: new FormControl(15),
    time: new FormControl(5)
  });

  answer = new FormControl(null);
  startGame = false;
  gameWillStartInSeconds = 3
  timer: number = 0;
  gameStartInterval;
  timerInterval;
  isPause=false;
  totalCount=0;
  correctCount=0;
  ngOnInit(): void {
    this.generateRandomNumber();
  }

  checkGivenAnswer() {
    if((+this.randomNumber*+this.randomNumber)==this.answer.value){
      this.correctCount++
      localStorage.setItem('correctCount',this.correctCount.toString())
    }
    this.resetTimer();
    this.answer.reset();
    this.generateRandomNumber();
   
  }


  pauseTheTimer(){
    this.answer.reset();
    this.isPause=!this.isPause;
    if(!this.isPause){
      document.getElementById('pause').style.display = "none";
      this.startGameTimer();
    }else{
      clearInterval(this.timerInterval);
      document.getElementById('pause').style.display = "block";
    }
  }

  startSquareGame() {
    this.resetAll();

    this.timer = this.setting.value.time;
    this.startGame = true;
    this.overlayOn();
  }

  generateRandomNumber() {
    const min=this.setting.value.startRange;
    const max=this.setting.value.endRange
    this.randomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
    this.totalCount++;
    localStorage.setItem('totalCount',this.totalCount.toString())

  }

  overlayOn() {
    this.gameWillStartInSeconds=3;
    document.getElementById("overlay").style.display = "block";
    this.gameStartInterval = setInterval(() => {
      this.gameWillStartInSeconds--
      if (this.gameWillStartInSeconds === 0) {
        this.overlayOff();
        this.startGameTimer();
      }
    }, 1000);
  }

  overlayOff() {
    document.getElementById("overlay").style.display = "none";
  }

  startGameTimer() {
    this.timerInterval = setInterval(() => {
      this.timer--
      if(this.isPause){
        clearInterval(this.timerInterval);
      }
      if (this.timer === -1) {
        this.generateRandomNumber();
        this.resetTimer();
        this.answer.reset();
      }

    }, 1000);
  }

  resetTimer() {
    this.timer = this.setting.value.time;
  }

  resetAll(){
    // this.totalCount=0;
    // this.correctCount=0;
    clearInterval(this.gameStartInterval);
    clearInterval(this.timerInterval);
  }

  transform(time: any): any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    let part = hour > 12 ? 'pm' : 'am';
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    return `${hour}:${min} ${part}`
  }

  ngOnDestroy() {
    clearInterval(this.gameStartInterval);
    clearInterval(this.timerInterval);
    clearInterval(this.timeInterval);
  }
}



