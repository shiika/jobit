import { Component, OnInit } from '@angular/core';
import { Employee } from "../../shared/models/employee.model";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    {
      firstName: "John",
      lastName: "Doe",
      title: "Frontend Developer",
      salary: "4000",
      skills: ["HTML", "CSS", "Javascript"],
      img: ""
    },
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
