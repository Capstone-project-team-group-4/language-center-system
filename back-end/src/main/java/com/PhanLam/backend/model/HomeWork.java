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
    private List<Document> requirementList;
    @OneToMany (mappedBy = "solutionID", fetch = FetchType.LAZY)
    private List<Document> solutionList;
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
    public List<Document> getRequirementList (){
        return requirementList;
    }

    public void setRequirementList (List<Document> requirementList){
        this.requirementList = requirementList;
    }

    @XmlTransient
    public List<Document> getSolutionList (){
        return solutionList;
    }

    public void setSolutionList (List<Document> solutionList){
        this.solutionList = solutionList;
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
        int hash = 0;
        hash += (homeWorkID != null ? homeWorkID.hashCode () : 0);
        return hash;
    }

    @Override
    public boolean equals (Object object){
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof HomeWork)){
            return false;
        }
        HomeWork other = (HomeWork) object;
        if ((this.homeWorkID == null && other.homeWorkID != null) || (this.homeWorkID != null && !this.homeWorkID.equals (other.homeWorkID))){
            return false;
        }
        return true;
    }

    @Override
    public String toString (){
        return "com.PhanLam.backend.model.HomeWork[ homeWorkID=" + homeWorkID + " ]";
    }
    
}