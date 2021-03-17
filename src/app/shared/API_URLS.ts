import { environment as env } from "../../environments/environment";

const server = env.serverURL;

export const API_URLS = {
    auth: {
        auth: server + "/auth/login",
        register: server + "/seeker/auth/register"
    },

    seeker: {
        addInterests: server + "/seeker/interests",
        addProf: server + "/seeker/prof-info"
    },

    validators: {
        email: server + "/validate/checkEmail",
        phone: server + "/validate/checkPhone"
    }
}