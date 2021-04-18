/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 *
 * @author Phan Lam
 */
@Entity


public class QuestionOption implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "OptionID", nullable = false)
    private Integer optionID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 1000)
    @Column (name = "Content", nullable = false, length = 1000)
    private String content;
    @Basic (optional = false)
    @NotNull
    @Column (name = "IsCorrectAnswer", nullable = false)
    private boolean isCorrectAnswer;

    @JoinColumn (
            name = "QuestionID"
            , referencedColumnName = "QuestionID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private MultipleChoiceQuestion multipleChoiceQuestion;

    public QuestionOption (){
    }

    public QuestionOption (Integer optionID){
        this.optionID = optionID;
    }

    public QuestionOption (
            String content
            , boolean isCorrectAnswer
            , MultipleChoiceQuestion multipleChoiceQuestion
    ){
        this.content = content;
        this.isCorrectAnswer = isCorrectAnswer;
        this.multipleChoiceQuestion = multipleChoiceQuestion;
    }

    public Integer getOptionID (){
        return optionID;
    }

    public void setOptionID (Integer optionID){
        this.optionID = optionID;
    }

    public String getContent (){
        return content;
    }

    public void setContent (String content){
        this.content = content;
    }

    public boolean getIsCorrectAnswer (){
        return isCorrectAnswer;
    }

    public void setIsCorrectAnswer (boolean isCorrectAnswer){
        this.isCorrectAnswer = isCorrectAnswer;
    }

    public MultipleChoiceQuestion getMultipleChoiceQuestion (){
        return multipleChoiceQuestion;
    }

    public void setMultipleChoiceQuestion (MultipleChoiceQuestion multipleChoiceQuestion){
        this.multipleChoiceQuestion = multipleChoiceQuestion;
    }

    @Override
    public int hashCode (){
        int hash = 0;
        hash += (optionID != null ? optionID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof QuestionOption)){
            return false;
        }
        QuestionOption other = (QuestionOption) object;
        if ((this.optionID == null && other.optionID != null) || (this.optionID != null && !this.optionID.equals (other.optionID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.QuestionOption[ optionID=" + optionID + " ]";
    }

}
