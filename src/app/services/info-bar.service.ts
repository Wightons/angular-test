import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class InfoBarService {

  private showInfoSource = new BehaviorSubject<{ show: boolean, data: any }>({ show: false, data: null });
  showInfo$ = this.showInfoSource.asObservable();

  showInfoBar(data: any) {
    this.showInfoSource.next({ show: true, data });
  }

  hideInfoBar() {
    this.showInfoSource.next({ show: false, data: null });
  }
}
