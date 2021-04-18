/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlTransient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Phan Lam
 */
@Entity

public class MultipleChoiceQuestion implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "QuestionID", nullable = false)
    private Integer questionID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 1000)
    @Column (name = "Content", nullable = false, length = 1000)
    private String content;

    @JoinColumn (
            name = "CreatorID"
            , referencedColumnName = "UserID"
            , nullable = false
    )
    @ManyToOne (optional = false, fetch = FetchType.EAGER)
    private User creator;

    @Basic (optional = false)
    @NotNull
    @Column (name = "DateCreated", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date dateCreated;
    @Column (name = "LastModified")
    @Temporal (TemporalType.TIMESTAMP)
    private Date lastModified;

    @JsonIgnore
    @ManyToMany (
            mappedBy = "multipleChoiceQuestionList"
            , cascade = {
                CascadeType.PERSIST
                , CascadeType.MERGE
                , CascadeType.REFRESH
                , CascadeType.DETACH
            }
            , fetch = FetchType.LAZY
    )
    private List<Examination> examinationList;

    @JsonIgnore
    @OneToMany (
            cascade = CascadeType.ALL
            , orphanRemoval = true
            , mappedBy = "multipleChoiceQuestion"
            , fetch = FetchType.LAZY
    )
    private List<QuestionOption> questionOptionList;

    public MultipleChoiceQuestion (){
        questionOptionList = new ArrayList<> ();
    }

    public MultipleChoiceQuestion (Integer questionID){
        this.questionID = questionID;
    }

    public MultipleChoiceQuestion (
            String content
            , User creator
            , Date dateCreated
            , Date lastModified
    ){
        this.content = content;
        this.creator = creator;
        this.dateCreated = dateCreated;
        this.lastModified = lastModified;
    }

    public Integer getQuestionID (){
        return questionID;
    }

    public void setQuestionID (Integer questionID){
        this.questionID = questionID;
    }

    public String getContent (){
        return content;
    }

    public void setContent (String content){
        this.content = content;
    }

    public User getCreator (){
        return creator;
    }

    public void setCreator (User creator){
        this.creator = creator;
    }

    public Date getDateCreated (){
        return dateCreated;
    }

    public void setDateCreated (Date dateCreated){
        this.dateCreated = dateCreated;
    }

    public Date getLastModified (){
        return lastModified;
    }

    public void setLastModified (Date lastModified){
        this.lastModified = lastModified;
    }

    @XmlTransient
    public List<Examination> getExaminationList (){
        return examinationList;
    }

    public void setExaminationList (List<Examination> examinationList){
        this.examinationList = examinationList;
    }

    @XmlTransient
    public List<QuestionOption> getQuestionOptionList (){
        return questionOptionList;
    }

    public void setQuestionOptionList (List<QuestionOption> questionOptionList){
        this.questionOptionList = questionOptionList;
    }

    @Override
    public int hashCode (){
        int hash = 0;
        hash += (questionID != null ? questionID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof MultipleChoiceQuestion)){
            return false;
        }
        MultipleChoiceQuestion other = (MultipleChoiceQuestion) object;
        if ((this.questionID == null && other.questionID != null) || (this.questionID != null && !this.questionID.equals (other.questionID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.MultipleChoiceQuestion[ questionID=" + questionID + " ]";
    }

}
