export interface Seeker {
    image_url: string;
    first_name: string;
    last_name: string;
    location: string;
    marital_status: string;
    military_status: string;
    gender: "male" | "female";
    email: string;
    phone_num: string;
    role_name?: string;
    skills?: string[];
    langs?: {name: string; level: string}[];
}