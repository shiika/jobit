export interface Job {
    companyName: string;
    title: string;
    publishDate: string;
    logo?: string;
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
    type: string;
    langs: string[];
}

export interface JobDesc {
    ID: number;
    companyName: string;
    title: string;
    publishDate: string;
    location?: string;
    experience_needed: number;
    description: string;
    skills?: string[];
    logo: string;
    type: string;
    vacancies: string;
    salary: string;
    isSaved?: boolean
}

export interface JobApp {
    app: {
        ID: number;
        title: string;
        publishDate: string;
        stateDate: string;
        status: string;
    },
    companyName: string;
    logo: string;
}