/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "QuestionOption", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "QuestionOption.findAll", query = "SELECT q FROM QuestionOption q"),
    @NamedQuery (name = "QuestionOption.findByOptionID", query = "SELECT q FROM QuestionOption q WHERE q.optionID = :optionID"),
    @NamedQuery (name = "QuestionOption.findByContent", query = "SELECT q FROM QuestionOption q WHERE q.content = :content"),
    @NamedQuery (name = "QuestionOption.findByIsCorrectAnswer", query = "SELECT q FROM QuestionOption q WHERE q.isCorrectAnswer = :isCorrectAnswer")})
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
        int hash = 5;
        hash = 71 * hash + Objects.hashCode (this.optionID);
        hash = 71 * hash + Objects.hashCode (this.content);
        hash = 71 * hash + (this.isCorrectAnswer ? 1 : 0);
        hash = 71 * hash + Objects.hashCode (this.multipleChoiceQuestion);
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
        final QuestionOption other = (QuestionOption) obj;
        if (this.isCorrectAnswer != other.isCorrectAnswer){
            return false;
        }
        if (!Objects.equals (this.content, other.content)){
            return false;
        }
        if (!Objects.equals (this.optionID, other.optionID)){
            return false;
        }
        if (!Objects.equals (this.multipleChoiceQuestion, other.multipleChoiceQuestion)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "QuestionOption {" 
                + "optionID=" + optionID 
                + ", content=" + content 
                + ", isCorrectAnswer=" + isCorrectAnswer 
                + ", multipleChoiceQuestion=" + multipleChoiceQuestion 
        + '}';
    }
}