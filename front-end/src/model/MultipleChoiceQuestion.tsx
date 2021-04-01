// Import package members section:
import { User } from "./User";

export class MultipleChoiceQuestion {

    // Variables declaration:
    public questionID: number;
    public content: string;
    public creator: User;
    public dateCreated: Date;
    public lastModified: Date;
    
    public constructor ();

    public constructor (multipleChoiceQuestion: MultipleChoiceQuestion);

    public constructor (multipleChoiceQuestion?: MultipleChoiceQuestion){
        if (typeof multipleChoiceQuestion !== "undefined"){
            this.questionID = multipleChoiceQuestion.questionID;
            this.content = multipleChoiceQuestion.content;
            this.creator = multipleChoiceQuestion.creator;
            this.dateCreated = multipleChoiceQuestion.dateCreated;
            this.lastModified = multipleChoiceQuestion.lastModified;
        }
        else {
            this.questionID = 0;
            this.content = "";
            this.creator = new User ();
            this.dateCreated = new Date (0);
            this.lastModified = new Date (0);
        }  
    }
}