export class ExceptionResponseBody {
    
    // Variables declaration:
    public exceptionTitle: string;
    public message: string;

	public constructor (exceptionTitle: string, message: string){
		this.exceptionTitle = exceptionTitle;
		this.message = message;
	}
}