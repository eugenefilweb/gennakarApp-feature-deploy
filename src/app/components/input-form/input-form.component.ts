import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class InputFormComponent implements OnInit {
  @Input() identification: string;
  @Input() placeholder: string;
  @Input() name: string;
  @Input() grow: any = '';
  constructor() { }

  ngOnInit() {}

}
