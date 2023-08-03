import { Component } from '@angular/core';
import { Card } from 'src/app/types/Card';
import { CardDataService } from 'src/app/services/card-data-service.service';
import { InfoBarService } from 'src/app/services/info-bar.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  catCardsInfo: Card[] = [];
  filteredCats: Card[] = [];
  searchText: string = '';
  constructor(private cardDataService: CardDataService, private infoBarService: InfoBarService) { }

  ngOnInit() {
    this.cardDataService.getCatsInfo().subscribe((cats) => {
      this.catCardsInfo = cats;
      this.filteredCats = cats;
    });
  }
  
  onTextChange(value: string){
    this.searchText = value.trim().toLowerCase();

    if (this.searchText === '') {
      this.filteredCats = this.catCardsInfo;
    } else {
      this.filteredCats = this.catCardsInfo.filter(
        (cat) => cat.name.toLowerCase().includes(this.searchText) || cat.origin.toLowerCase().includes(this.searchText)
      );
    }

  }

  showInfoBar(url: string,name: string, description: string, temperament: string, origin: string) {
    this.infoBarService.showInfoBar({url: url, name: name, description: description, temperament: temperament,origin: origin});
  }

  highlightText(text: string, searchText: string): string {
    if (!searchText || searchText.trim() === '') {
      return text;
    }
  
    const openingTag = '<span class="highlighted-text">';
    const closingTag = '</span>';
    const textLower = text.toLowerCase();
    const searchTextLower = searchText.toLowerCase();
  
    let highlightedText = '';
    let searchStart = 0;
  
    while (searchStart < text.length) {
      const foundIndex = textLower.indexOf(searchTextLower, searchStart);
  
      if (foundIndex === -1) {
        highlightedText += text.slice(searchStart);
        break;
      }
  
      highlightedText += text.slice(searchStart, foundIndex);
      highlightedText += openingTag + text.slice(foundIndex, foundIndex + searchText.length) + closingTag;
  
      searchStart = foundIndex + searchText.length;
    }
  
    return highlightedText;
  }
  

}
