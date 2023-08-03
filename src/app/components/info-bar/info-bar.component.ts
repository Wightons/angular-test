import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoBarService } from 'src/app/services/info-bar.service';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.css']
})
export class InfoBarComponent {
  
  imagePath: string = '';
  temperament: string = '';
  origin: string = '';
  description: string = '';
  name: string = '';

  
  showInfo = false;
  private subscription: Subscription;

  constructor(private infoBarService: InfoBarService) {
    this.subscription = this.infoBarService.showInfo$.subscribe(({ show, data }) => {
      this.showInfo = show;
      this.imagePath = data.url;
      this.name = data.name;
      this.temperament = data.temperament;
      this.origin = data.origin;
      this.description = data.description;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  hideInfo() {
    this.infoBarService.hideInfoBar();
  }
}
