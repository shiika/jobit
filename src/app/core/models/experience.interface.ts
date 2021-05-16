export interface Experience {
    ID: number;
    salary: string;
    companyName: string;
    jobType: "full-time" | "part-time" | "internship" | "remotly";
    title: string;
    startDate: Date;
    endDate: Date;
}