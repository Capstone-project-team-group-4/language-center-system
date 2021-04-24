/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

// Import package members section:
import java.util.List;
import java.util.Objects;

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

    @Override
    public int hashCode (){
        int hash = 7;
        hash = 67 * hash + Objects.hashCode (this.multipleChoiceQuestion);
        hash = 67 * hash + Objects.hashCode (this.questionOptionHolder);
        return hash;
    }

    @Override
    public boolean equals (Object obj){
        if (this == obj){
            return true;
        }
        if (obj == null){
            return false;
        }
        if (getClass () != obj.getClass ()){
            return false;
        }
        final Quiz other = (Quiz) obj;
        if (!Objects.equals (this.multipleChoiceQuestion, other.multipleChoiceQuestion)){
            return false;
        }
        if (!Objects.equals (this.questionOptionHolder, other.questionOptionHolder)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "Quiz {" 
                + "multipleChoiceQuestion=" + multipleChoiceQuestion 
                + ", questionOptionHolder=" + questionOptionHolder 
        + '}';
    }
}
