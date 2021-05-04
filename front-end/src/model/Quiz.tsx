// Import package members section:
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { QuestionOption } from "./QuestionOption";

export class Quiz {

  // Variables declaration:
  public multipleChoiceQuestion: MultipleChoiceQuestion;
  public questionOptionHolder: QuestionOption[];

  public constructor ();

  public constructor (
      multipleChoiceQuestion: MultipleChoiceQuestion
      , questionOptionHolder: QuestionOption[]
  );

	public constructor (
      multipleChoiceQuestion?: MultipleChoiceQuestion
      , questionOptionHolder?: QuestionOption[]
  ){
    let questionOption: QuestionOption | undefined;

    if (
        (typeof multipleChoiceQuestion !== "undefined")
        && (typeof questionOptionHolder !== "undefined")
    ){
      this.multipleChoiceQuestion = multipleChoiceQuestion;
      this.questionOptionHolder = questionOptionHolder;
    }
    else {
      this.multipleChoiceQuestion = new MultipleChoiceQuestion ();
      this.questionOptionHolder = new Array<QuestionOption> ();
      questionOption = new QuestionOption ();
      this.questionOptionHolder[0] = questionOption;
      this.questionOptionHolder[1] = questionOption;
      this.questionOptionHolder[2] = questionOption;
      this.questionOptionHolder[3] = questionOption;
    }
	}
}