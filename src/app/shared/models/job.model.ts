export interface Job {
    companyName: string;
    title: string;
    publishDate: string;
    image: string;
    skills: string[];
}

export interface JobPost {
    title: string;
    experience: number;
    salary: number;
    publishDate: Date;
    skills: string[];
    description: string;
    vacancies: number;
    expireDate: Date;
    types: string[];
    langs: string[];
}