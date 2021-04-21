/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
 * @author Phan Lam
 */
@Entity
@Table (name = "MultipleChoiceQuestion", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "MultipleChoiceQuestion.findAll", query = "SELECT m FROM MultipleChoiceQuestion m"),
    @NamedQuery (name = "MultipleChoiceQuestion.findByQuestionID", query = "SELECT m FROM MultipleChoiceQuestion m WHERE m.questionID = :questionID"),
    @NamedQuery (name = "MultipleChoiceQuestion.findByContent", query = "SELECT m FROM MultipleChoiceQuestion m WHERE m.content = :content"),
    @NamedQuery (name = "MultipleChoiceQuestion.findByDateCreated", query = "SELECT m FROM MultipleChoiceQuestion m WHERE m.dateCreated = :dateCreated")})
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
        int hash = 7;
        hash = 73 * hash + Objects.hashCode (this.questionID);
        hash = 73 * hash + Objects.hashCode (this.content);
        hash = 73 * hash + Objects.hashCode (this.creator);
        hash = 73 * hash + Objects.hashCode (this.dateCreated);
        hash = 73 * hash + Objects.hashCode (this.lastModified);
        hash = 73 * hash + Objects.hashCode (this.examinationList);
        hash = 73 * hash + Objects.hashCode (this.questionOptionList);
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
        final MultipleChoiceQuestion other = (MultipleChoiceQuestion) obj;
        if (!Objects.equals (this.content, other.content)){
            return false;
        }
        if (!Objects.equals (this.questionID, other.questionID)){
            return false;
        }
        if (!Objects.equals (this.creator, other.creator)){
            return false;
        }
        if (!Objects.equals (this.dateCreated, other.dateCreated)){
            return false;
        }
        if (!Objects.equals (this.lastModified, other.lastModified)){
            return false;
        }
        if (!Objects.equals (this.examinationList, other.examinationList)){
            return false;
        }
        if (!Objects.equals (this.questionOptionList, other.questionOptionList)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "MultipleChoiceQuestion {" 
                + "questionID=" + questionID 
                + ", content=" + content 
                + ", creator=" + creator 
                + ", dateCreated=" + dateCreated 
                + ", lastModified=" + lastModified 
                + ", examinationList=" + examinationList 
                + ", questionOptionList=" + questionOptionList 
        + '}';
    }
}