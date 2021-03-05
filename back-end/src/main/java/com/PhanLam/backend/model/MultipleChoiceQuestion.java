/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author DELL
 */
@Entity
@Table(name = "MultipleChoiceQuestion", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "MultipleChoiceQuestion.findAll", query = "SELECT m FROM MultipleChoiceQuestion m"),
    @NamedQuery(name = "MultipleChoiceQuestion.findByQuestionID", query = "SELECT m FROM MultipleChoiceQuestion m WHERE m.questionID = :questionID"),
    @NamedQuery(name = "MultipleChoiceQuestion.findByContent", query = "SELECT m FROM MultipleChoiceQuestion m WHERE m.content = :content"),
    @NamedQuery(name = "MultipleChoiceQuestion.findByDateCreated", query = "SELECT m FROM MultipleChoiceQuestion m WHERE m.dateCreated = :dateCreated")})
public class MultipleChoiceQuestion implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "QuestionID", nullable = false)
    private Integer questionID;
    @Basic(optional = false)
    @NotNull
    @Size(min = 1, max = 1000)
    @Column(name = "Content", nullable = false, length = 1000)
    private String content;
    @Basic(optional = false)
    @NotNull
    @Column(name = "DateCreated", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;
    @ManyToMany(mappedBy = "multipleChoiceQuestionList", fetch = FetchType.LAZY)
    private List<Examination> examinationList;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "questionID", fetch = FetchType.LAZY)
    private List<QuestionOption> questionOptionList;

    public MultipleChoiceQuestion() {
    }

    public MultipleChoiceQuestion(Integer questionID) {
        this.questionID = questionID;
    }

    public MultipleChoiceQuestion(Integer questionID, String content, Date dateCreated) {
        this.questionID = questionID;
        this.content = content;
        this.dateCreated = dateCreated;
    }

    public Integer getQuestionID() {
        return questionID;
    }

    public void setQuestionID(Integer questionID) {
        this.questionID = questionID;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    @XmlTransient
    public List<Examination> getExaminationList() {
        return examinationList;
    }

    public void setExaminationList(List<Examination> examinationList) {
        this.examinationList = examinationList;
    }

    @XmlTransient
    public List<QuestionOption> getQuestionOptionList() {
        return questionOptionList;
    }

    public void setQuestionOptionList(List<QuestionOption> questionOptionList) {
        this.questionOptionList = questionOptionList;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (questionID != null ? questionID.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MultipleChoiceQuestion)) {
            return false;
        }
        MultipleChoiceQuestion other = (MultipleChoiceQuestion) object;
        if ((this.questionID == null && other.questionID != null) || (this.questionID != null && !this.questionID.equals(other.questionID))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.PhanLam.backend.model.MultipleChoiceQuestion[ questionID=" + questionID + " ]";
    }
    
}
