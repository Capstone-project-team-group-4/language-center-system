// Import package members section:
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { DataPage } from "../../App";
import { LoggedInUser } from "../../model/LoggedInUser";
import { SpareTime } from "../../model/SpareTime";
import { AxiosInstanceGet } from "./AxiosInstanceGet";
import { ErrorHandle } from "./ErrorHandle";
import { TypeGuard } from "./TypeGuard";

export class ClassAPI {
  // Variables declaration:
  private serverResponse: AxiosResponse<unknown> | undefined;
  private axiosInstance: AxiosInstance;
  private axiosInstanceGetter: AxiosInstanceGet | undefined;
  private typeGuardian: TypeGuard;
  private loggedInUser: LoggedInUser | undefined;
  private axiosError: AxiosError<unknown> | undefined;
  private errorHandler: ErrorHandle;
  private requestParameterHolder: URLSearchParams | undefined;
  private spareTimeHolder: SpareTime[] | undefined;
  private spareTimeDataPage: DataPage<SpareTime> | undefined;

  public constructor() {
    this.axiosInstanceGetter = new AxiosInstanceGet();
    this.axiosInstance = this.axiosInstanceGetter.getNewInstance();
    this.errorHandler = new ErrorHandle();
    this.typeGuardian = new TypeGuard();
  }

  public async getListClass(
    pageNumber: number,
    pageSize: number,
    userID?: number,
    role?: string
  ): Promise<any> {
    this.requestParameterHolder = new URLSearchParams();
    this.requestParameterHolder.set("pageNumber", pageNumber.toString());
    this.requestParameterHolder.set("pageSize", pageSize.toString());
    try {
      const serverResponse = await this.axiosInstance.get<unknown>(
        "/class-sessions",
        { params: { pageNumber, pageSize, userID , role } }
      );
      if (serverResponse?.data) {
        if (serverResponse?.data)
      console.log('serverResponse?.data', serverResponse?.data);

          return Promise.resolve<any>(serverResponse?.data);
      } else {
        // throw new Error("This server response is not valid !");
      }
    } catch (apiError: unknown) {
      try {
        this.axiosError = await this.errorHandler.handleApiError(apiError);
        return Promise.reject(this.axiosError);
      } catch (apiError2: unknown) {
        return Promise.reject(apiError2);
      }
    }
  }

}
