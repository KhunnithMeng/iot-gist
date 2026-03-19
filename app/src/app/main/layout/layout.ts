import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBar } from '../side-bar/side-bar';
import { TopHeader } from '../top-header/top-header';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SideBar,TopHeader, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
