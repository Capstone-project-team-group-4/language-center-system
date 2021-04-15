// Import package members section:
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { Quiz } from "../../model/Quiz";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class QuizAPI {

    // Variables declaration:
    private axiosInstance: AxiosInstance;
    private axiosInstanceGetter: AxiosInstanceGet;
    private axiosError: AxiosError<unknown> | undefined;
    private errorHandler: ErrorHandle;
    private requestParameterHolder: URLSearchParams | undefined;
    private serverResponse: AxiosResponse<unknown> | undefined;
    private typeGuardian: TypeGuard;
    private quizDataPage: DataPage<Quiz> | undefined;

    public constructor (){
        this.axiosInstanceGetter = new AxiosInstanceGet ();
        this.axiosInstance = this.axiosInstanceGetter.getNewInstance ();
        this.errorHandler = new ErrorHandle ();
        this.typeGuardian = new TypeGuard ();
    }

    public async createNewQuiz (quiz: Quiz): Promise<void> {
        try {
            await this.axiosInstance.post<undefined> (
                    "/quizzes"
                    , quiz
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

    public async getAllQuizCreatedByCurrentLoggedInUser (
            pageIndex: number
            , pageSize: number
    ): Promise<DataPage<Quiz>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/quizzes:created-by-logged-in-user"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<Quiz> (
                    this.serverResponse.data
            )){
                this.quizDataPage = this.serverResponse.data; 
                return Promise.resolve<DataPage<Quiz>> (this.quizDataPage);
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

    public async getAllQuizAreInTheExam (
            examID: number
            , pageIndex: number
            , pageSize: number
    ): Promise<DataPage<Quiz>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    `/examinations/${examID}/quizzes`
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<Quiz> (
                    this.serverResponse.data
            )){
                this.quizDataPage = this.serverResponse.data; 
                return Promise.resolve<DataPage<Quiz>> (this.quizDataPage);
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

    public async getAllQuizExcludingQuizInTheExam (
            examID: number
            , pageIndex: number
            , pageSize: number
    ): Promise<DataPage<Quiz>> {
        this.requestParameterHolder = new URLSearchParams ();
        this.requestParameterHolder.set ("examID", examID.toString ());
        this.requestParameterHolder.set ("pageIndex", pageIndex.toString ());
        this.requestParameterHolder.set ("pageSize", pageSize.toString ());
        try {
            this.serverResponse = await this.axiosInstance.get<unknown> (
                    "/quizzes:excluding-quiz-in-the-exam"
                    , {params: this.requestParameterHolder}
            );
            if (this.typeGuardian.isDataPage<Quiz> (
                    this.serverResponse.data
            )){
                this.quizDataPage = this.serverResponse.data; 
                return Promise.resolve<DataPage<Quiz>> (this.quizDataPage);
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

    public async updateQuiz (updatedQuiz: Quiz): Promise<void> {
        try {
            await this.axiosInstance.put<undefined> (
                    `/quizzes/${updatedQuiz.multipleChoiceQuestion.questionID}`
                    , updatedQuiz
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

    public async deleteQuizByQuestionID (questionID: number): Promise<void> {
        try {
            await this.axiosInstance.delete<undefined> (
                    `/quizzes/${questionID}`
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