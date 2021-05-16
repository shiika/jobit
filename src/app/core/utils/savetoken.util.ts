export function saveToken( credentials: {[key: string]: string}) {
    localStorage.setItem("token", credentials.token);
}