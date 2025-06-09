import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Esp {
  http = inject(HttpClient);
  private esp32Ip = 'http://192.168.1.156'; // Your ESP32 IP

    openRelay(): Observable<string> {
    return this.http.get(`${this.esp32Ip}/open`, { 
      responseType: 'text' as const 
    });
  }
}
