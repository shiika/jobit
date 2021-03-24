import { environment as env } from "../../environments/environment";

const server = env.serverURL;

export const API_URLS: {[key: string]: {[key: string]: string}} = {
    seeker: {
        login: server + "/seeker/auth/login",
        register: server + "/seeker/auth/register",
        addInterests: server + "/seeker/interests",
        addProf: server + "/seeker/prof-info",
    },

    emp: {
        login: server + "/employer/auth/login",
        register: server + "/employer/auth/register"
    },

    validators: {
        email: server + "/validate/checkEmail",
        phone: server + "/validate/checkPhone"
    }
}