// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { CourseLevel } from "../../model/CourseLevel";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class CourseLevelAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private errorHandler: ErrorHandle;
    private axiosError: AxiosError<unknown> | undefined; 
    private serverResponse: AxiosResponse<unknown> | undefined;
    private courseLevelHolder: CourseLevel[] | undefined;
    private typeGuardian: TypeGuard;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async getAllCourseLevelByTypeID (
            typeID: number
    ): Promise<CourseLevel[]> {
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                `/course-types/${typeID}/course-levels`
            );
            if (this.typeGuardian.isCourseLevelArray (
                    this.serverResponse.data
            )){
                this.courseLevelHolder = this.serverResponse.data;
                return Promise.resolve<CourseLevel[]> (this.courseLevelHolder);
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
