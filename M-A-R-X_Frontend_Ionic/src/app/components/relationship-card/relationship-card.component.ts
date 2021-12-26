import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-relationship-card',
  templateUrl: './relationship-card.component.html',
  styleUrls: ['./relationship-card.component.scss'],
})
export class RelationshipCardComponent implements OnInit {
  @Input()
  relationship;

  constructor() { }

  ngOnInit() {}

}
