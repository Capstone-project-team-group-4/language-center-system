/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

// Import package members section:
import java.util.List;

/**
 *
 * @author Phan Lam
 */
public class Quiz {
    
    // Variables declaration:
    private MultipleChoiceQuestion multipleChoiceQuestion;
    private List<QuestionOption> questionOptionHolder;

    public Quiz (){
    }

    public Quiz (
            MultipleChoiceQuestion multipleChoiceQuestion
            , List<QuestionOption> questionOptionHolder
    ){
        this.multipleChoiceQuestion = multipleChoiceQuestion;
        this.questionOptionHolder = questionOptionHolder;
    }

    public MultipleChoiceQuestion getMultipleChoiceQuestion (){
        return multipleChoiceQuestion;
    }

    public void setMultipleChoiceQuestion (
            MultipleChoiceQuestion multipleChoiceQuestion
    ){
        this.multipleChoiceQuestion = multipleChoiceQuestion;
    }

    public List<QuestionOption> getQuestionOptionHolder (){
        return questionOptionHolder;
    }

    public void setQuestionOptionHolder (
            List<QuestionOption> questionOptionHolder
    ){
        this.questionOptionHolder = questionOptionHolder;
    }
}
