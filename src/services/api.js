import axios from 'axios';

export const api = axios.create({
    baseURL: "https://api-notes-production-a935.up.railway.app"
});
 ///http://localhost:3333