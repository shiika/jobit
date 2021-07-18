import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  animations: [
    trigger("menuToggle", [
      state("close", style({
        transform: "rotate(0deg)"
      })),
      state("open", style({
        transform: "rotate(360deg)"
      })),
      transition("open <=> close", [
        animate("0.3s ease-in-out")
      ])
    ]),
  ]
})
export class ToolbarComponent implements OnInit {
  @Input() isToggled: boolean;
  @Input() isMobile: boolean;
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  toggleNavbar(): void {
    this.isToggled = !this.isToggled;
    this.onToggle.emit(this.isToggled)
  }

  logout(): void {
    this.auth.logout();
  }

}
