import { QuestionOption } from "../../model/QuestionOption";
import { DialogControl } from "../component/ModalDialog";

export class InputValidate {

    // Variables declaration:
    private dialogController: DialogControl;
    private isValid: boolean | undefined;
    private checkDuplicateSet: Set<string> | undefined;
    private numberOfCorrectAnswer: number | undefined;

    public constructor (dialogController: DialogControl){
        this.dialogController = dialogController;
    }

    public validateQuestionOption (
            questionOptionHolder: QuestionOption[]
    ): boolean {
        this.isValid = true;
        this.checkDuplicateSet = new Set<string> ();
        for (let option of questionOptionHolder){
            this.checkDuplicateSet.add (option.content);
        }
        if (this.checkDuplicateSet.size !== questionOptionHolder.length){
            this.dialogController.setDialogTitle ("Create Question Failed !");
            this.dialogController.setDialogBody (
                    "The quiz cannot contain duplicate question options."
            );
            this.dialogController.setDialogType ("error");
            this.dialogController.setShowDialog (true);
            this.isValid = false;
        }
        else {
            this.numberOfCorrectAnswer = 0;
            for (let option of questionOptionHolder){
                if (option.isCorrectAnswer === true){
                    this.numberOfCorrectAnswer++;
                }
            }
            if (this.numberOfCorrectAnswer === 0){
                this.dialogController.setDialogTitle (
                        "Create Question Failed !"
                );
                this.dialogController.setDialogBody (
                        `Please provide at least one question option 
                        as correct answer.`
                );
                this.dialogController.setDialogType ("error");
                this.dialogController.setShowDialog (true);
                this.isValid = false;
            }
            else if (this.numberOfCorrectAnswer === 4){
                this.dialogController.setDialogTitle (
                        "Create Question Failed !"
                );
                this.dialogController.setDialogBody (
                        `The question cannot have all 4 question option 
                        as correct answer.`
                );
                this.dialogController.setDialogType ("error");
                this.dialogController.setShowDialog (true);
                this.isValid = false;
            }
        }
        return this.isValid;
    }
}