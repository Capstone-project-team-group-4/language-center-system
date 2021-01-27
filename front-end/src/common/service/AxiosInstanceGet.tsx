import axios, { AxiosInstance } from "axios";

export class AxiosInstanceGet {

    public getNewInstance (): AxiosInstance {
        let newInstance: AxiosInstance;
        newInstance = axios.create ({
            baseURL: 'http://localhost:8080'
        });
        newInstance.defaults.headers.post['Content-Type'] = 'application/json';
        newInstance.defaults.headers.post['Accept'] = 'application/json';
        return newInstance;
    }
}