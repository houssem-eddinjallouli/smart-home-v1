import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Esp } from './esp';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
isUnlocked = false;
  message = '';

  constructor(private espService: Esp) {}

  unlockDoor() {
    if (this.isUnlocked) return;
    
    this.isUnlocked = true;
    this.message = 'Opening door...';

    const subscription = this.espService.openRelay().subscribe({
      next: (response) => {
        this.message = response;
        this.resetAfterDelay();
      },
      error: (error) => {
        this.message = 'Error: Could not unlock door';
        this.resetAfterDelay();
      },
      complete: () => {
        subscription.unsubscribe();
      }
    });
  }

  private resetAfterDelay() {
    setTimeout(() => {
      this.isUnlocked = false;
      this.message = '';
    }, 2000);
  }
}
