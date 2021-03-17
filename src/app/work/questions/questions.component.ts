import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input() questions: {question: string, answer: string | null}[] = [
    {
      question: "What makes you ideal to this job?",
      answer: null
    },
    {
      question: "Have you done an Angular project",
      answer: null
    },
    {
      question: "Do you have the ability to start immediately>",
      answer: null
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
