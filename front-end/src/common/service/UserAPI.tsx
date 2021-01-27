import { AxiosInstance, AxiosResponse } from "axios";
import { User } from "../../model/User";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { TypeGuard } from "./TypeGuard";

export class UserAPI {

    // Variables declaration:
    private serverResponse: AxiosResponse | undefined;
    private axiosInstance: AxiosInstance | undefined;
    private axiosInstanceGetter: AxiosInstanceGet | undefined;
    private typeGuardian: TypeGuard | undefined;
    
    public async registerUser (user: User): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        try {
            this.serverResponse = await this.axiosInstance.post (
                "/users"
                , user
            );
            this.typeGuardian = new TypeGuard ();
            if (this.typeGuardian.isAxiosResponse (this.serverResponse)){
                return this.serverResponse;
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (error){
            console.error (error.toJSON ());
            return Promise.reject<AxiosResponse> (error);
        }   
    }

    public async deleteUser (userID: string): Promise<AxiosResponse> {
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        try {
            this.serverResponse = await this.axiosInstance.delete (
                `/users/${userID}`
            );
            this.typeGuardian = new TypeGuard ();
            if (this.typeGuardian.isAxiosResponse (this.serverResponse)){
                return this.serverResponse;
            }
            else {
                throw new Error ("This server response is not valid !");
            }
        }
        catch (error){
            console.error (error.toJSON ());
            return Promise.reject<AxiosResponse> (error);
        }
    }
}