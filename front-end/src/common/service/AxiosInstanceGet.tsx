// Import package members section:
import axios, { AxiosInstance } from "axios";

export class AxiosInstanceGet {

    public getNewInstance (): AxiosInstance {
        let newInstance: AxiosInstance;
        newInstance = axios.create ({
            baseURL: 'http://54.169.178.48:8081'
        });
        newInstance.defaults.headers.post['Content-Type'] = 'application/json';
        newInstance.defaults.headers.post['Accept'] = 'application/json';
        newInstance.defaults.withCredentials = true;
        return newInstance;
    }
}