import { environment as env } from "../../environments/environment";

const server = env.serverURL;

export const API_URLS: any = {
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
        getInterests: server + "/seeker/get-interests",
        update: {
            general: server + "/seeker/update",
            interests: server + "/seeker/update-interests",
            prof: server + "/seeker/update-prof"
        }
    },

    job: {
        getJobs: server + "/employer/jobs",
        getSkills: server + "/employer/skills",
        postJob: server + "/job/post",
        apply: server + "/job/apply",
        empJobs: server + "/job/jobs"
    },

    emp: {
        login: server + "/auth/login",
        register: server + "/auth/emp-register",
        employees: server + "/employer/employees"
    },

    validators: {
        email: server + "/validate/checkEmail",
        phone: server + "/validate/checkPhone"
    }
}