import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-patrol-history-card',
  templateUrl: './patrol-history-card.component.html',
  styleUrls: ['./patrol-history-card.component.scss'],
})
export class PatrolHistoryCardComponent implements OnInit {
  @Input() condition: any;
  constructor() { }

  ngOnInit() {}

}
