/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
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
 * @author DELL
 */
@Entity
@Table(name = "QuestionOption", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "QuestionOption.findAll", query = "SELECT q FROM QuestionOption q"),
    @NamedQuery(name = "QuestionOption.findByOptionID", query = "SELECT q FROM QuestionOption q WHERE q.optionID = :optionID"),
    @NamedQuery(name = "QuestionOption.findByContent", query = "SELECT q FROM QuestionOption q WHERE q.content = :content"),
    @NamedQuery(name = "QuestionOption.findByIsCorrectAnswer", query = "SELECT q FROM QuestionOption q WHERE q.isCorrectAnswer = :isCorrectAnswer")})
public class QuestionOption implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "OptionID", nullable = false)
    private Integer optionID;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "Content", nullable = false, length = 1000)
    private String content;
    @Basic(optional = false)
    @NotNull
    @Column(name = "IsCorrectAnswer", nullable = false)
    private boolean isCorrectAnswer;
    @JoinColumn(name = "QuestionID", referencedColumnName = "QuestionID", nullable = false)
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private MultipleChoiceQuestion questionID;

    public QuestionOption() {
    }

    public QuestionOption(Integer optionID) {
        this.optionID = optionID;
    }

    public QuestionOption(Integer optionID, String content, boolean isCorrectAnswer) {
        this.optionID = optionID;
        this.content = content;
        this.isCorrectAnswer = isCorrectAnswer;
    }

    public Integer getOptionID() {
        return optionID;
    }

    public void setOptionID(Integer optionID) {
        this.optionID = optionID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public boolean getIsCorrectAnswer() {
        return isCorrectAnswer;
    }

    public void setIsCorrectAnswer(boolean isCorrectAnswer) {
        this.isCorrectAnswer = isCorrectAnswer;
    }

    public MultipleChoiceQuestion getQuestionID() {
        return questionID;
    }

    public void setQuestionID(MultipleChoiceQuestion questionID) {
        this.questionID = questionID;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (optionID != null ? optionID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof QuestionOption)) {
            return false;
        }
        QuestionOption other = (QuestionOption) object;
        if ((this.optionID == null && other.optionID != null) || (this.optionID != null && !this.optionID.equals(other.optionID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.QuestionOption[ optionID=" + optionID + " ]";
    }
    
}
