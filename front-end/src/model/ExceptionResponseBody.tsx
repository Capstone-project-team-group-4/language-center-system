export class ExceptionResponseBody {
    
    // Variables declaration:
    public exceptionName: string;
    public message: string;

	public constructor (exceptionName: string, message: string){
		this.exceptionName = exceptionName;
		this.message = message;
	}
}