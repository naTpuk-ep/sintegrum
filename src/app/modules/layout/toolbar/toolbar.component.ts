import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @ViewChild('logOutBtn') logOutBtnRef!: ElementRef<HTMLButtonElement>;
  constructor() {}

  ngOnInit(): void {}
}
