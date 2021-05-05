import { environment as env } from "../../environments/environment";

const server = env.serverURL;

export const API_URLS: {[key: string]: {[key: string]: string}} = {
    seeker: {
        login: server + "/auth/login",
        register: server + "/auth/register",
        addInterests: server + "/seeker/interests",
        addProf: server + "/seeker/prof-info",
    },

    emp: {
        login: server + "/auth/login",
        register: server + "/auth/emp-register",
        postJob: server + "/employer/post"
    },

    validators: {
        email: server + "/validate/checkEmail",
        phone: server + "/validate/checkPhone"
    }
}