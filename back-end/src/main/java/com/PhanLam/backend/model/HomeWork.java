/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.PhanLam.backend.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
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
@Table (name = "HomeWork", catalog = "LanguageCenterDB", schema = "dbo")
@XmlRootElement
@NamedQueries ({
    @NamedQuery (name = "HomeWork.findAll", query = "SELECT h FROM HomeWork h"),
    @NamedQuery (name = "HomeWork.findByHomeWorkID", query = "SELECT h FROM HomeWork h WHERE h.homeWorkID = :homeWorkID"),
    @NamedQuery (name = "HomeWork.findByRequirement", query = "SELECT h FROM HomeWork h WHERE h.requirement = :requirement"),
    @NamedQuery (name = "HomeWork.findByDeadline", query = "SELECT h FROM HomeWork h WHERE h.deadline = :deadline")})
public class HomeWork implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Basic (optional = false)
    @Column (name = "HomeWorkID", nullable = false)
    private Integer homeWorkID;
    @Basic (optional = false)
    @NotNull
    @Size (min = 1, max = 1000)
    @Column (name = "Requirement", nullable = false, length = 1000)
    private String requirement;
    @Basic (optional = false)
    @NotNull
    @Column (name = "Deadline", nullable = false)
    @Temporal (TemporalType.TIMESTAMP)
    private Date deadline;
    @OneToMany (mappedBy = "homeWorkID", fetch = FetchType.LAZY)
    private List<StudentScore> studentScoreList;
    @OneToMany (mappedBy = "requirementID", fetch = FetchType.LAZY)
    private List<Document> documentList;
    @OneToMany (mappedBy = "solutionID", fetch = FetchType.LAZY)
    private List<Document> documentList1;
    @JoinColumn (name = "ClassID", referencedColumnName = "ClassID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private ClassSession classID;
    @JoinColumn (name = "LessonID", referencedColumnName = "LessonID", nullable = false)
    @ManyToOne (optional = false, fetch = FetchType.LAZY)
    private Lesson lessonID;

    public HomeWork (){
    }

    public HomeWork (Integer homeWorkID){
        this.homeWorkID = homeWorkID;
    }

    public HomeWork (Integer homeWorkID, String requirement, Date deadline){
        this.homeWorkID = homeWorkID;
        this.requirement = requirement;
        this.deadline = deadline;
    }

    public Integer getHomeWorkID (){
        return homeWorkID;
    }

    public void setHomeWorkID (Integer homeWorkID){
        this.homeWorkID = homeWorkID;
    }

    public String getRequirement (){
        return requirement;
    }

    public void setRequirement (String requirement){
        this.requirement = requirement;
    }

    public Date getDeadline (){
        return deadline;
    }

    public void setDeadline (Date deadline){
        this.deadline = deadline;
    }

    @XmlTransient
    public List<StudentScore> getStudentScoreList (){
        return studentScoreList;
    }

    public void setStudentScoreList (List<StudentScore> studentScoreList){
        this.studentScoreList = studentScoreList;
    }

    @XmlTransient
    public List<Document> getDocumentList (){
        return documentList;
    }

    public void setDocumentList (List<Document> documentList){
        this.documentList = documentList;
    }

    @XmlTransient
    public List<Document> getDocumentList1 (){
        return documentList1;
    }

    public void setDocumentList1 (List<Document> documentList1){
        this.documentList1 = documentList1;
    }

    public ClassSession getClassID (){
        return classID;
    }

    public void setClassID (ClassSession classID){
        this.classID = classID;
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
        hash = 71 * hash + Objects.hashCode (this.homeWorkID);
        hash = 71 * hash + Objects.hashCode (this.requirement);
        hash = 71 * hash + Objects.hashCode (this.deadline);
        hash = 71 * hash + Objects.hashCode (this.studentScoreList);
        hash = 71 * hash + Objects.hashCode (this.documentList);
        hash = 71 * hash + Objects.hashCode (this.documentList1);
        hash = 71 * hash + Objects.hashCode (this.classID);
        hash = 71 * hash + Objects.hashCode (this.lessonID);
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
        final HomeWork other = (HomeWork) obj;
        if (!Objects.equals (this.requirement, other.requirement)){
            return false;
        }
        if (!Objects.equals (this.homeWorkID, other.homeWorkID)){
            return false;
        }
        if (!Objects.equals (this.deadline, other.deadline)){
            return false;
        }
        if (!Objects.equals (this.studentScoreList, other.studentScoreList)){
            return false;
        }
        if (!Objects.equals (this.documentList, other.documentList)){
            return false;
        }
        if (!Objects.equals (this.documentList1, other.documentList1)){
            return false;
        }
        if (!Objects.equals (this.classID, other.classID)){
            return false;
        }
        if (!Objects.equals (this.lessonID, other.lessonID)){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "HomeWork {" 
                + "homeWorkID=" + homeWorkID 
                + ", requirement=" + requirement 
                + ", deadline=" + deadline 
                + ", studentScoreList=" + studentScoreList 
                + ", documentList=" + documentList 
                + ", documentList1=" + documentList1 
                + ", classID=" + classID 
                + ", lessonID=" + lessonID 
        + '}';
    }
}