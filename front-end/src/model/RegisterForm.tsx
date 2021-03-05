export class RegisterForm {

    // Variables declaration:
    public formID: number;
	public userName: string;
	public firstName: string;
	public middleName: string;
	public lastName: string;
	public email: string;
	public phoneNumber: string;
	public password: string;
	
	public constructor ();

	public constructor (registerForm: RegisterForm);

	public constructor (registerForm?: RegisterForm){
		if (typeof registerForm !== "undefined"){
			this.formID = registerForm.formID;
			this.userName = registerForm.userName;
			this.firstName = registerForm.firstName;
			this.middleName = registerForm.middleName;
			this.lastName = registerForm.lastName;
			this.email = registerForm.email;
			this.phoneNumber = registerForm.phoneNumber;
			this.password = registerForm.password;	
		}
		else {
			this.formID = 0;
			this.userName = "";
			this.firstName = "";
			this.middleName = "";
			this.lastName = "";
			this.email = "";
			this.phoneNumber = "";
			this.password = "";
		}
	}
}
