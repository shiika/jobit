export interface Education {
    degreeLevel: string;
    institution: string;
    fieldOfStudy: string;
    grade: "A" | "B" | "C";
    startDate: Date;
    endDate: Date;
}