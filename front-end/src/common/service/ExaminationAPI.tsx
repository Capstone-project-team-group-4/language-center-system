import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { Examination } from "../../model/Examination";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class ExaminationAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private axiosError: AxiosError<unknown> | undefined;
    private errorHandler: ErrorHandle;
    private requestParameterHolder: URLSearchParams | undefined;
    private serverResponse: AxiosResponse<unknown> | undefined;
    private typeGuardian: TypeGuard;
    private examDataPage: DataPage<Examination> | undefined;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async createNewExamInCourse (
            courseID: number
            , exam: Examination
    ): Promise<void> {
        try {
            await this.axiosInstance.post<undefined> (
                    `/courses/${courseID}/examinations`
                    , exam
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

    public async getAllExam (
            pageIndex: number
            , pageSize: number
    ): Promise<DataPage<Examination>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/examinations"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<Examination> (
                    this.serverResponse.data
            )){
                this.examDataPage = this.serverResponse.data;
                return Promise.resolve<DataPage<Examination>> (
                        this.examDataPage
                );
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

    public async getAllExamByCourseID (
            courseID: number
            , pageIndex: number
            , pageSize: number
    ): Promise<DataPage<Examination>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    `/courses/${courseID}/examinations`
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<Examination> (
                    this.serverResponse.data
            )){
                this.examDataPage = this.serverResponse.data;
                return Promise.resolve<DataPage<Examination>> (
                        this.examDataPage
                );
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

    public async getAllExamByCurrentLoggedInStudent (
            pageIndex: number
            , pageSize: number
    ): Promise<DataPage<Examination>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            
        }
    }

    public async updateExamInCourse (
            courseID: number
            , updatedExam: Examination 
    ): Promise<void> {
        try {
            await this.axiosInstance.put<undefined> (
                    `/courses/${courseID}/examinations/${updatedExam.examID}`
                    , updatedExam
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

    public async addAQuizToExam (
            questionID: number
            , examID: number
    ): Promise<void> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("questionID", questionID.toString ());
        try {
            await this.axiosInstance.patch<undefined> (
                    `/examinations/${examID}:add-a-quiz`
                    , undefined
                    , {params: this.requestParameterHolder}
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

    public async removeAQuizFromExam (
            questionID: number
            , examID: number
    ): Promise<void> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("questionID", questionID.toString ());
        try {
            await this.axiosInstance.patch<undefined> (
                    `/examinations/${examID}:remove-a-quiz`
                    , undefined
                    , {params: this.requestParameterHolder}
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

    public async deleteExamInCourse (
            courseID: number
            , examID: number
    ): Promise<void> {
        try {
            await this.axiosInstance.delete<undefined> (
                    `/courses/${courseID}/examinations/${examID}`
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