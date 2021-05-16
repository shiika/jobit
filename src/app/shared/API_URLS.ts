import { environment as env } from "../../environments/environment";

const server = env.serverURL;

export const API_URLS: {[key: string]: {[key: string]: string}} = {
    seeker: {
        login: server + "/auth/login",
        register: server + "/auth/register",
        addInterests: server + "/seeker/interests",
        addProf: server + "/seeker/prof-info",
        addExp: server + "/seeker/add-exp",
        removeExp: server + "/seeker/del-exp",
        addEdu: server + "/seeker/add-edu",
        profile: server + "/seeker/profile",
        skills: server + "/seeker/skills",
        langs: server + "/seeker/langs",
        edu: server + "/seeker/edu",
        exp: server + "/seeker/exp",
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