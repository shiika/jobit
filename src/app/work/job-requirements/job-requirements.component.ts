import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-requirements',
  templateUrl: './job-requirements.component.html',
  styleUrls: ['./job-requirements.component.scss']
})
export class JobRequirementsComponent implements OnInit {
  skills: string[] = [ "UX", "Angular", "Typescript", "Git", "2-3 Experience" ];
  requirements: string[] = Array.from({length: 6}, (item, i) => `i`)

  constructor() { }

  ngOnInit(): void {
  }

}
