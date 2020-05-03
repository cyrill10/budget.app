import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotBuiltService {

  constructor() { }

  showMessage() {
    window.alert('What if I told you that does not exist yet');
  }
}
