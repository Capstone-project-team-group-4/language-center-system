// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { CourseType } from "../../model/CourseType";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class CourseTypeAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined; 
    private serverResponse: AxiosResponse<unknown> | undefined;
    private courseTypeHolder: CourseType[] | undefined;
    private typeGuardian: TypeGuard;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async getAllCourseTypeInTheSystem (): Promise<CourseType[]> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/course-types"
            );
            if (this.typeGuardian.isCourseTypeArray (this.serverResponse.data)){
                this.courseTypeHolder = this.serverResponse.data;
                return Promise.resolve<CourseType[]> (this.courseTypeHolder);
            }
            else {
                throw new Error ("This server response is not valid !");
            }
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
