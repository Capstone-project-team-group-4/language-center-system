/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Phan Lam
 */
@Entity
@Table (name = "Document", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "Document.findAll", query = "SELECT d FROM Document d"),
    @NamedQuery (name = "Document.findByDocumentID", query = "SELECT d FROM Document d WHERE d.documentID = :documentID"),
    @NamedQuery (name = "Document.findByDescription", query = "SELECT d FROM Document d WHERE d.description = :description"),
    @NamedQuery (name = "Document.findByUri", query = "SELECT d FROM Document d WHERE d.uri = :uri"),
    @NamedQuery (name = "Document.findByPostTime", query = "SELECT d FROM Document d WHERE d.postTime = :postTime")})
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "DocumentID", nullable = false)
    private Integer documentID;
    @Size (max = 1000)
    @Column (name = "Description", length = 1000)
    private String description;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 1000)
    @Column (name = "URI", nullable = false, length = 1000)
    private String uri;
    @Basic (optional = false)
    @NotNull
    @Column (name = "PostTime", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date postTime;
    @JoinColumn (name = "RequirementID", referencedColumnName = "HomeWorkID")
    @ManyToOne (fetch = FetchType.LAZY)
    private HomeWork requirementID;
    @JoinColumn (name = "SolutionID", referencedColumnName = "HomeWorkID")
    @ManyToOne (fetch = FetchType.LAZY)
    private HomeWork solutionID;
    @JoinColumn (name = "LessonID", referencedColumnName = "LessonID")
    @ManyToOne (fetch = FetchType.LAZY)
    private Lesson lessonID;

    public Document (){
    }

    public Document (Integer documentID){
        this.documentID = documentID;
    }

    public Document (Integer documentID, String uri, Date postTime){
        this.documentID = documentID;
        this.uri = uri;
        this.postTime = postTime;
    }

    public Integer getDocumentID (){
        return documentID;
    }

    public void setDocumentID (Integer documentID){
        this.documentID = documentID;
    }

    public String getDescription (){
        return description;
    }

    public void setDescription (String description){
        this.description = description;
    }

    public String getUri (){
        return uri;
    }

    public void setUri (String uri){
        this.uri = uri;
    }

    public Date getPostTime (){
        return postTime;
    }

    public void setPostTime (Date postTime){
        this.postTime = postTime;
    }

    public HomeWork getRequirementID (){
        return requirementID;
    }

    public void setRequirementID (HomeWork requirementID){
        this.requirementID = requirementID;
    }

    public HomeWork getSolutionID (){
        return solutionID;
    }

    public void setSolutionID (HomeWork solutionID){
        this.solutionID = solutionID;
    }

    public Lesson getLessonID (){
        return lessonID;
    }

    public void setLessonID (Lesson lessonID){
        this.lessonID = lessonID;
    }

    @Override
    public int hashCode (){
        int hash = 7;
        hash = 17 * hash + Objects.hashCode (this.documentID);
        hash = 17 * hash + Objects.hashCode (this.description);
        hash = 17 * hash + Objects.hashCode (this.uri);
        hash = 17 * hash + Objects.hashCode (this.postTime);
        hash = 17 * hash + Objects.hashCode (this.requirementID);
        hash = 17 * hash + Objects.hashCode (this.solutionID);
        hash = 17 * hash + Objects.hashCode (this.lessonID);
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
        final Document other = (Document) obj;
        if (!Objects.equals (this.description, other.description)){
            return false;
        }
        if (!Objects.equals (this.uri, other.uri)){
            return false;
        }
        if (!Objects.equals (this.documentID, other.documentID)){
            return false;
        }
        if (!Objects.equals (this.postTime, other.postTime)){
            return false;
        }
        if (!Objects.equals (this.requirementID, other.requirementID)){
            return false;
        }
        if (!Objects.equals (this.solutionID, other.solutionID)){
            return false;
        }
        if (!Objects.equals (this.lessonID, other.lessonID)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "Document {" 
                + "documentID=" + documentID 
                + ", description=" + description 
                + ", uri=" + uri 
                + ", postTime=" + postTime 
                + ", requirementID=" + requirementID 
                + ", solutionID=" + solutionID 
                + ", lessonID=" + lessonID 
        + '}';
    }
}
