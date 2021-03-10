// Import package members section:
import { AxiosError, AxiosInstance } from "axios";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";

export class LogOutAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet | undefined;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle (); 
    }

    public async logOut (): Promise<void> {
        try {
            await this.axiosInstance.post<undefined> (
                    "/logout"
            );
            return Promise.resolve<undefined> (undefined);
        }
        catch (apiError: unknown){
            try {
                this.axiosError 
                    = await this.errorHandler.handleApiError (apiError); 
                return Promise.reject (this.axiosError);
            }
            catch (apiError2: unknown){
                return Promise.reject (apiError2);
            }
        }
    }
}