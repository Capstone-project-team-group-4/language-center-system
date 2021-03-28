// Import package members section:
import { MultipleChoiceQuestion } from "./MultipleChoiceQuestion";
import { QuestionOption } from "./QuestionOption";

export class Quiz {

  // Variables declaration:
  public multipleChoiceQuestion: MultipleChoiceQuestion;
  public questionOptionHolder: QuestionOption[];

	public constructor (
          multipleChoiceQuestion: MultipleChoiceQuestion
          , questionOptionHolder: QuestionOption[]
  ){
      this.multipleChoiceQuestion = multipleChoiceQuestion;
      this.questionOptionHolder = questionOptionHolder;
	}
}