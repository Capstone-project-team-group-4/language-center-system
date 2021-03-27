// Import package members section:
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";

export class QuestionOption {

    // Variables declaration:
    public optionID: number;
    public content: string;
    public isCorrectAnswer: boolean;
    public multipleChoiceQuestion: MultipleChoiceQuestion; 

    public constructor ();

    public constructor (questionOption: QuestionOption);

    public constructor (questionOption?: QuestionOption){
        if (typeof questionOption !== "undefined"){
            this.optionID = questionOption.optionID;
            this.content = questionOption.content;
            this.isCorrectAnswer = questionOption.isCorrectAnswer;
            this.multipleChoiceQuestion = questionOption.multipleChoiceQuestion;
        }
        else {
            this.optionID = 0;
            this.content = "";
            this.isCorrectAnswer = false;
            this.multipleChoiceQuestion = new MultipleChoiceQuestion ();
        }
    }
}